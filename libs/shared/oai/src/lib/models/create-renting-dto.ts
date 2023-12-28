/* tslint:disable */
/* eslint-disable */
export interface CreateRentingDto {
  address: string;
  campusId: number;
  description: string;
  facilityIds?: Array<number>;
  features?: Array<string>;
  floor: number;
  houseTypeId: number;
  images?: Array<string>;
  price: number;
  rules?: Array<string>;
  square: number;
  title: string;
  totalFloor: number;
}
