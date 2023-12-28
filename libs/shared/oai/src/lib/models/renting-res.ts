/* tslint:disable */
/* eslint-disable */
export interface RentingRes {
  address: string;
  campusId: number | null;
  createdAt: string;
  floor: number;
  houseTypeId: number;
  images: Array<string>;
  isRented: boolean;
  landlordId: number | null;
  price: number;
  rentingId: number;
  square: number;
  title: string;
  totalFloor: number;
}
