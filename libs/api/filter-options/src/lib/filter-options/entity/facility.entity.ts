export class Facility {
  facilityId!: number;
  name!: string;
  icon!: string;

  constructor(data: Facility) {
    const { facilityId, name, icon } = data;
    Object.assign(this, { facilityId, name, icon });
  }
}
