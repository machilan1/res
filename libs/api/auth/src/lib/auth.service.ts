import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Database, PG_CONNECTION } from '@res/database';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { StudentRegisterDto } from './dtos/student-register-dto';

interface SignATPayload {
  userId: number;
  role: string;
}

interface SignRTPayload extends SignATPayload {}

interface Tokens {
  at: string;
  rt: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_CONNECTION) private conn: Database,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async studentRegister(
    studentRegisterDto: StudentRegisterDto
  ): Promise<Tokens> {
    //

    const newUser: Student[] = await this.conn
      .insert(user)
      .values(studentRegisterDto)
      .returning();

    if (!newUser) {
      throw new BadRequestException();
    }

    const { userId, role } = newUser;

    const [at, rt] = await Promise.all([
      this.signAccessToken({ userId, role }),
      this.signRefreshToken({ userId, role }),
    ]);

    return { at, rt };
  }
  studentLogin(studentLoginDto: StudentLoginDto): Tokens {}

  landlordRegister(landlordRegister: LandlordRegisterDto): Tokens {}
  refresh(refreshTokenDto: RefresTokenDto): Tokens {}

  //   utils
  private encrypt(password: string) {
    const hash = bcrypt.hashSync(
      password,
      +this.configService.get('SALT_ROUND') || 12
    );
    return hash;
  }

  private checkPassword(secret: string, hash: string): boolean {
    const res = bcrypt.compareSync(secret, hash);
    return res;
  }

  async #getUserHashedPassword(userId: number) {
    const secret = await this.conn
      .select({ secret: user.password })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return secret[0].secret;
  }

  async signAccessToken(user: SignATPayload) {
    return this.jwtService.signAsync(user, {
      expiresIn: this.configService.get('ACCESS_TOKEN_MINUTES_TILL_EXPIRE'),
    });
  }

  async signRefreshToken(user: SignRTPayload) {
    return this.jwtService.signAsync(user, {
      expiresIn: this.configService.get('REFRESH_TOKEN_MINUTES_TILL_EXPIRE'),
    });
  }
}
