import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const excludedRoles: string[] = this.reflector.getAllAndOverride(
      'excludedRoles',
      [context.getHandler(), context.getClass()],
    );

    const accessibleRoles: string[] = this.reflector.getAllAndOverride(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const role = request['user'].role;

    if (role === 'admin') {
      return true;
    }

    if (accessibleRoles) {
      return accessibleRoles.includes(role);
    }

    if (excludedRoles) {
      return !excludedRoles.includes(role);
    }

    throw new InternalServerErrorException();
  }
}
