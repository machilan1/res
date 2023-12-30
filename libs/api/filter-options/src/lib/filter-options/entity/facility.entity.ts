import { Exclude } from 'class-transformer';

export class Facility {
  facilityId!: number;
  name!: string;
  icon!: string;
  @Exclude()
  deletedAt!: Date;
  constructor(data: Facility) {
    Object.assign(this, data);
  }
}
