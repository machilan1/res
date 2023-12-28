/* tslint:disable */
/* eslint-disable */
import { ContactTime } from '../models/contact-time';
export interface UpdateLandlordDto {
  banned?: boolean;
  contactTime?: ContactTime;
  email?: string;
  name?: string;
  phone?: string;
}
