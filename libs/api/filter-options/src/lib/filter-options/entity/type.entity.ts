import { DatabaseError } from 'pg';

export class HouseType {
  houseTypeId!: number;
  name!: string;

  constructor(data: HouseType) {
    const { houseTypeId, name } = data;
    Object.assign(this, { houseTypeId, name });
  }
}
