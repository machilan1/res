/* tslint:disable */
/* eslint-disable */
import { ContactTime } from '../models/contact-time';
export interface RegisterLandlordDto {
  contactTime: ContactTime;
  email: string;
  name: string;
  password: string;
  phone: string;
}
