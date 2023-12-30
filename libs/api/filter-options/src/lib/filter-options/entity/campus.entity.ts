export class Campus {
  campusId!: number;
  name!: string;

  constructor(data: Campus) {
    const { campusId, name } = data;

    Object.assign(this, { campusId, name });
  }
}
