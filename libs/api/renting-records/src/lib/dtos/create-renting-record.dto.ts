import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRentingRecordDto {
  @IsPositive()
  rentingId!: number;
  @IsPositive()
  studentId!: number;
}
