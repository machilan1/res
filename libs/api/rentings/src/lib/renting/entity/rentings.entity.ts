import { ApiExtraModels } from '@nestjs/swagger';
import { Campus } from './campus.entity';
import { Facility } from './facility.entity';
import { Feature } from './feature.entity';
import { Landlord } from './landlord.entity';
import { Rule } from './rule.entity';
import { HouseType as HouseType } from './type.entity';
import { Type } from 'class-transformer';

@ApiExtraModels()
export class Renting {
  rentingId!: number;
  title!: string;
  price!: number;
  address!: string;
  images!: string[];

  @Type(() => Campus)
  campus!: Campus;
  houseType!: HouseType;
  square!: number;
  floor!: number;
  totalFloor!: number;
  description!: string;
  rules!: Rule[];
  facilities!: Facility[];
  features!: Feature[];
  createdAt!: Date;

  @Type(() => Landlord)
  landlord!: Landlord;
  isRented!: boolean;

  constructor(data: Renting) {
    Object.assign(this, data);
  }
}
