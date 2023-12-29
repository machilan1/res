import { SetMetadata } from '@nestjs/common';

export const NeedRefreshToken = () => SetMetadata('NeedRefreshToken ', true);
