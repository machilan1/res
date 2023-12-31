export class Facility {
  facilityId!: number;
  name!: string;
  icon!: string;
  constructor(data: Facility) {
    Object.assign(this, data);
  }
}
