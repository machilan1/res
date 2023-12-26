/* tslint:disable */
/* eslint-disable */
import { Campus } from '../models/campus';
import { Facility } from '../models/facility';
import { HouseType } from '../models/house-type';
export interface FilterOption {
  campus: Array<Campus>;
  facilities: Array<Facility>;
  houseType: Array<HouseType>;
}
