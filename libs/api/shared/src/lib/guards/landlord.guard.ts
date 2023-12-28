import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LandlordGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      request['user'] &&
      (request['user'].role === 'landlord' || request['user'].role === 'admin')
    ) {
      return true;
    }

    return false;
  }
}
