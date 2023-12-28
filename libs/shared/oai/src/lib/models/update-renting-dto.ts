/* tslint:disable */
/* eslint-disable */
import { Feature } from '../models/feature';
import { Rule } from '../models/rule';
export interface UpdateRentingDto {
  address?: string;
  campusId?: number;
  description?: string;
  facilityIds?: Array<number>;
  features?: Array<Feature>;
  floor?: number;
  images?: Array<string>;
  price?: number;
  rules?: Array<Rule>;
  square?: number;
  title?: string;
  totalFloor?: number;
  typeId?: number;
}
