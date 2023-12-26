export class HouseType {
  houseTypeId!: number;
  name!: string;

  constructor(data: HouseType) {
    Object.assign(this, data);
  }
}
