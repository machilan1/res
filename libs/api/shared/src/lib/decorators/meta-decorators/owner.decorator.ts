import { SetMetadata } from '@nestjs/common';
import { OWNER_OF_RESOURCE } from '../../constants/reflector.constant';

export const OwnerOf = (resource: Resource) => {
  return SetMetadata(OWNER_OF_RESOURCE, resource);
};

type Resource =
  | 'rentings'
  | 'students'
  | 'landlords'
  | 'renting-records'
  | 'favorites';
