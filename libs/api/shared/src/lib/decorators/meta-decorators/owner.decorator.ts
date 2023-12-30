import { SetMetadata } from '@nestjs/common';

export const OwnerOf = (resource: Resource) => {
  return SetMetadata('ownershipOfResource', resource);
};

type Resource =
  | 'rentings'
  | 'students'
  | 'landlords'
  | 'renting-records'
  | 'favorites';
