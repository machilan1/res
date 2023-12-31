import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { USER } from '../constants/context-meta.constant';

export interface AttachedUser {
  userId: number;
  role: string;
}

export const GetCurrentUser = createParamDecorator(
  (field: string | undefined, context: ExecutionContext): AttachedUser => {
    const request = context.switchToHttp().getRequest();
    if (!field) return request[USER];
    return request[USER][field];
  },
);
