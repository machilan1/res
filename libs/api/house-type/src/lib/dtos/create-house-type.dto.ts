import { IsNotEmpty } from 'class-validator';

export class CreateHouseTypeDto {
  @IsNotEmpty()
  name!: string;
}
