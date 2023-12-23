export class LandlordEntity {
  landlordId!: number;
  name!: string;
  phone!: number;
  email!: string;
  renting!: Renting[];
  startTime!: number;
  endTime!: number;
  isForbidden!: boolean;
}
