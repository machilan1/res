import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  Database,
  InsertLandlord,
  PG_CONNECTION,
  SelectUser,
  admin,
  landlord,
  student,
  user,
} from '@res/api-database';

import * as bcrypt from 'bcrypt';
import { Tokens } from './responses/tokens.response';
import { RegisterStudentDto } from './dtos/student-register.dto';
import { StudentLoginDto } from './dtos/student-login.dto';
import { and, eq, isNotNull } from 'drizzle-orm';
import { RegisterLandlordDto } from './dtos/register-landlord.dto';
import { LandlordLoginDto } from './dtos/landlord-login.dto';
import { RegisterAdminDto } from './dtos/register-admin.dto';
import { AdminLoginDto } from './dtos/admin-login.dto';
import {
  AttachedUser,
  CREDENTIAL_ERROR_MSG,
  REFRESH_TOKEN_NOT_FOUND_ERROR_MSG,
  REGISTER_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  USER_NOT_FOUND_ERROR_MSG,
  USER_UPDATE_ERROR_MSG,
} from '@res/api-shared';
import { AccessToken } from './responses/access-token.response';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_CONNECTION) private conn: Database,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async registerStudent(
    registerStudentDto: RegisterStudentDto,
  ): Promise<Tokens> {
    let userRes: SelectUser;

    const { name, password, phone, studentNumber } = registerStudentDto;
    const hashedPassword = this.encrypt(password);

    const transactionRes = await this.conn.transaction(async (tx) => {
      [userRes] = await tx
        .insert(user)
        .values({ name, password: hashedPassword, phone, role: 'student' })
        .returning();
      try {
        await tx
          .insert(student)
          .values({ studentNumber, userId: userRes.userId })
          .returning();
      } catch (err) {
        console.log('---transaction student res');
        console.log(err);
        throw new BadRequestException(REGISTER_ERROR_MSG);
      }
      const { userId, role } = userRes;
      return { userId, role };
    });

    const tokens = await this.signTokens(transactionRes!);
    try {
      const [res] = await this.conn
        .update(user)
        .set({ refreshToken: this.encrypt(tokens.refreshToken!) })
        .where(eq(user.userId, transactionRes.userId))
        .returning({ refreshToken: user.refreshToken });

      if (!res.refreshToken) {
        throw new ConflictException(REFRESH_TOKEN_NOT_FOUND_ERROR_MSG);
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error occured. (student registration)',
      );
    }

    return tokens;
  }

  async studentLogin(studentLoginDto: StudentLoginDto): Promise<Tokens> {
    const userRes = await this.conn.query.student.findFirst({
      with: { user: true },
      where: eq(student.studentNumber, studentLoginDto.studentNumber),
    });

    if (!userRes) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MSG);
    }

    const matches = await this.checkPassword(
      studentLoginDto.password,
      userRes.user.password,
    );

    if (!matches) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }

    const {
      userId,
      user: { role },
    } = userRes;

    const { accessToken, refreshToken } = await this.signTokens({
      userId,
      role,
    });

    try {
      await this.renewRefreshToken(userId, refreshToken!);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }

    return { accessToken, refreshToken };
  }

  async registerLandlord(
    registerLandlordDto: RegisterLandlordDto,
  ): Promise<Tokens> {
    let userRes: SelectUser;
    const { name, password, phone, email, contactTimeStart, contactTimeEnd } =
      registerLandlordDto;

    const hashedPassword = this.encrypt(password);

    const transactionRes = await this.conn.transaction(async (tx) => {
      [userRes] = await tx
        .insert(user)
        .values({ name, password: hashedPassword, phone, role: 'landlord' })
        .returning();

      const values: InsertLandlord = { email, userId: userRes.userId };

      if (contactTimeStart && contactTimeEnd) {
        (values.contactTimeStart = contactTimeStart),
          (values.contactTimeEnd = contactTimeEnd);
      }

      try {
        await tx.insert(landlord).values(values).returning();
      } catch (err) {
        console.log(err);
        throw new ConflictException(REGISTER_ERROR_MSG);
      }
      const { userId, role } = userRes;
      return { userId, role };
    });

    const tokens = await this.signTokens(transactionRes!);
    try {
      const [res] = await this.conn
        .update(user)
        .set({ refreshToken: this.encrypt(tokens.refreshToken!) })
        .where(eq(user.userId, transactionRes.userId))
        .returning({ refreshToken: user.refreshToken });
      if (!res.refreshToken) {
        throw new BadRequestException(USER_UPDATE_ERROR_MSG);
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
    }

    return tokens;
  }

  async landlordLogin(landlordLoginDto: LandlordLoginDto): Promise<Tokens> {
    const landlordRes = await this.conn.query.landlord.findFirst({
      with: { user: true },
      where: eq(landlord.email, landlordLoginDto.email),
    });

    if (!landlordRes) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MSG);
    }

    const matches = await this.checkPassword(
      landlordLoginDto.password,
      landlordRes.user.password,
    );

    if (!matches) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }

    const {
      userId,
      user: { role },
    } = landlordRes;

    const { accessToken, refreshToken } = await this.signTokens({
      userId,
      role,
    });

    try {
      await this.renewRefreshToken(userId, refreshToken!);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
    }
    return { accessToken, refreshToken };
  }

  async registerAdmin(registerAdminDto: RegisterAdminDto): Promise<Tokens> {
    const { name, password, phone, email } = registerAdminDto;

    const hashedPassword = this.encrypt(password);
    let userRes: SelectUser;
    const transactionRes = await this.conn.transaction(async (tx) => {
      [userRes] = await tx
        .insert(user)
        .values({ name, password: hashedPassword, phone, role: 'admin' })
        .returning();

      try {
        await tx
          .insert(admin)
          .values({ email, userId: userRes.userId })
          .returning();
      } catch (err) {
        throw new BadRequestException(REGISTER_ERROR_MSG);
      }
      const { userId, role } = userRes;
      return { userId, role };
    });

    const tokens = await this.signTokens(transactionRes!);

    try {
      const [res] = await this.conn
        .update(user)
        .set({ refreshToken: this.encrypt(tokens.refreshToken!) })
        .where(eq(user.userId, transactionRes.userId))
        .returning({ refreshToken: user.refreshToken });
      if (!res.refreshToken) {
        throw new BadRequestException(USER_UPDATE_ERROR_MSG);
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
    }

    return tokens;
  }

  async adminLogin(adminLoginDto: AdminLoginDto): Promise<Tokens> {
    const adminRes = await this.conn.query.admin.findFirst({
      with: { user: true },
      where: eq(admin.email, adminLoginDto.email),
    });
    if (!adminRes) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MSG);
    }

    const matches = await this.checkPassword(
      adminLoginDto.password,
      adminRes.user.password,
    );

    if (!matches) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }

    const {
      userId,
      user: { role },
    } = adminRes;

    const { accessToken, refreshToken } = await this.signTokens({
      userId,
      role,
    });

    try {
      await this.renewRefreshToken(userId, refreshToken!);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
    }
    return { accessToken, refreshToken };
  }

  async logout(userId: number) {
    if (!userId) {
      throw new BadRequestException();
    }
    try {
      const res = await this.conn
        .update(user)
        .set({ refreshToken: null })
        .where(and(eq(user.userId, userId), isNotNull(user.refreshToken)))
        .returning();

      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
    }
  }

  async refreshAccessToken(
    userId: number,
    refreshToken: string,
  ): Promise<AccessToken> {
    const [res] = await this.conn
      .select({ refreshTokenHash: user.refreshToken, role: user.role })
      .from(user)
      .where(eq(user.userId, userId));

    if (!res.refreshTokenHash) {
      throw new BadRequestException();
    }

    const matches = await this.inspectRefreshToken(
      refreshToken,
      res.refreshTokenHash,
    );

    if (!matches) {
      throw new BadRequestException();
    }

    const tokens = await this.signTokens({ userId, role: res.role });

    return new AccessToken({ accessToken: tokens.accessToken });
  }

  // utilities

  // Get user hash by id
  async getUserPasswordHash(userId: number) {
    const [secret] = await this.conn
      .select({ secret: user.password })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return secret.secret;
  }

  async getUserRefreshTokenHash(userId: number) {
    const [secret] = await this.conn
      .select({ refreshToken: user.refreshToken })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return secret.refreshToken;
  }

  private encrypt(content: string) {
    const hash = bcrypt.hashSync(
      content,
      +this.configService.get('SALT_ROUND') ?? 12,
    );
    return hash;
  }

  private async checkPassword(secret: string, hash: string): Promise<boolean> {
    const res = await bcrypt.compare(secret, hash);
    return res;
  }

  private async signTokens(selectUser: AttachedUser): Promise<Tokens> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            userId: selectUser!.userId,
            role: selectUser!.role,
          },
          {
            secret: this.configService.getOrThrow('JWT_SECRET'),
            expiresIn:
              this.configService.get('ACCESS_TOKEN_HOURS_TILL_EXPIRE') + 'h',
          },
        ),
        this.jwtService.signAsync(
          {
            userId: selectUser!.userId,
            role: selectUser!.role,
          },
          {
            secret: this.configService.getOrThrow('JWT_SECRET'),
            expiresIn:
              this.configService.get('REFRESH_TOKEN_DAYS_TILL_EXPIRE') + 'd',
          },
        ),
      ]);
      return { accessToken, refreshToken };
    } catch (err) {
      console.log('---signToken');
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  private async renewRefreshToken(userId: number, refreshToken: string) {
    const [res] = await this.conn
      .update(user)
      .set({ refreshToken: this.encrypt(refreshToken) })
      .where(eq(user.userId, userId))
      .returning();
    return res;
  }

  private async inspectRefreshToken(
    refreshToken: string,
    hash: string,
  ): Promise<boolean> {
    const compareRes = await bcrypt.compare(refreshToken, hash);

    if (!compareRes) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }

    const valid = this.validateToken(refreshToken);

    return valid;
  }

  private async validateToken(token: string): Promise<boolean> {
    const res = await this.jwtService.verifyAsync<AttachedUser>(token, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
    if (!res) {
      return false;
    }
    return true;
  }
}
