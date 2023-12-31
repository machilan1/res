export class Campus {
  campusId!: number;
  name!: string;
  constructor(data: Campus) {
    Object.assign(this, data);
  }
}
