import { SetMetadata } from '@nestjs/common';
import { EXCLUDED_ROLES } from '../../constants/reflector.constant';

export const ExcludeRoles = (roles: Role[]) =>
  SetMetadata(EXCLUDED_ROLES, roles);

type Role = 'student' | 'landlord';
