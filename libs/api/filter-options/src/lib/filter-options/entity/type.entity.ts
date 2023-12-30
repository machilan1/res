import { Exclude } from 'class-transformer';

export class HouseType {
  houseTypeId!: number;
  name!: string;
  @Exclude()
  deletedAt!: Date;

  constructor(data: HouseType) {
    Object.assign(this, data);
  }
}
