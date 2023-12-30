import { SetMetadata } from '@nestjs/common';

export const AccessRoles = (roles: Role[]) => SetMetadata('roles', roles);

type Role = 'student' | 'landlord' | 'owner' | 'admin';
