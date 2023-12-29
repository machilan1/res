import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export const GetRefreshTokenWithUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): { token: string } => {
    const request = context.switchToHttp().getRequest();
    return { token: request.headers.authorization };
  },
);
