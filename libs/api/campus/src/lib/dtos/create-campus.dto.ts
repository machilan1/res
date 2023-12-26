import { IsNotEmpty } from 'class-validator';

export class CreateCampusDto {
  @IsNotEmpty()
  name!: string;
}
