import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '../../constants/reflector.constant';

export const Public = () => SetMetadata(IS_PUBLIC, true);
