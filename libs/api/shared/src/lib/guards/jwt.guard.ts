import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CREDENTIAL_ERROR_MSG } from '../constants/error-messages.constant';
import { USER } from '../constants/context-meta.constant';
import { AttachedUser } from '../decorators/get-current-user.decorator';
import { IS_PUBLIC } from '../constants/reflector.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }

    try {
      const payload = await this.jwtService.verifyAsync<AttachedUser>(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      request[USER] = payload;
    } catch {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization) {
      throw new UnauthorizedException(CREDENTIAL_ERROR_MSG);
    }
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
