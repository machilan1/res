/* tslint:disable */
/* eslint-disable */
import { RentingRes } from '../models/renting-res';
export interface Landlord {
  banned: boolean;
  email: string;
  endTime: number;
  landlordId: number;
  name: string;
  phone: string;
  rentings: Array<RentingRes>;
  startTime: number;
}
