import { Feature } from '../entity/feature.entity';
import { Rule } from '../entity/rule.entity';
import { Facility } from '../entity/facility.entity';

export class UpdateRentingDto {
  // landlordId!: number;
  title?: string;
  description?: string;
  typeId?: number;
  campusId?: number;
  address?: string;
  price?: number;
  square?: number;
  floor?: number;
  totalFloor?: number;

  images?: string[];

  features?: Feature[];

  rules?: Rule[];

  facilityIds?: number[];
}
