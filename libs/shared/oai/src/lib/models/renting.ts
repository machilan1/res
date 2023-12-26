/* tslint:disable */
/* eslint-disable */
import { Campus } from '../models/campus';
import { Facility } from '../models/facility';
import { Feature } from '../models/feature';
import { HouseType } from '../models/house-type';
import { Landlord } from '../models/landlord';
import { Rule } from '../models/rule';
export interface Renting {
  address: string;
  campus: Campus;
  createdAt: string;
  description: string;
  facilities: Array<Facility>;
  features: Array<Feature>;
  floor: number;
  houseType: HouseType;
  images: Array<string>;
  isRented: boolean;
  landlord: Landlord;
  price: number;
  rentingId: number;
  rules: Array<Rule>;
  square: number;
  title: string;
  totalFloor: number;
}
