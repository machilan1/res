import { Campus } from './campus.entity';
import { Facility } from './facility.entity';
import { HouseType } from './type.entity';

export class FilterOption {
  campus!: Campus[];
  houseType!: HouseType[];
  facilities!: Facility[];
}
