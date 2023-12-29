import { SetMetadata } from '@nestjs/common';

export const ExcludeRoles = (roles: Role[]) =>
  SetMetadata('excludedRoles', roles);

type Role = 'student' | 'landlord';
