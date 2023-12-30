import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { USER } from '../constants/context-meta.constant';

export interface AttachedUser {
  userId: number;
  role: string;
}

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): AttachedUser => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request[USER];
    return request[USER][data];
  },
);
