import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  CREDENTIAL_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
} from '../constants/error-messages.constant';
import { USER } from '../constants/context-meta.constant';

import { AttachedUser } from '../decorators/get-current-user.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
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
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env['JWT_SECRET'],
      });
      request[USER] = payload as AttachedUser;
    } catch {
      throw new InternalServerErrorException(UNKNOWN_ERROR_MSG);
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
