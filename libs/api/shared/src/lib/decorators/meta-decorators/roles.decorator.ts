import { SetMetadata } from '@nestjs/common';
import { GRANTED_ROLES } from '../../constants/reflector.constant';

export const AccessRoles = (roles: Role[]) => SetMetadata(GRANTED_ROLES, roles);

type Role = 'student' | 'landlord' | 'owner' | 'admin';
