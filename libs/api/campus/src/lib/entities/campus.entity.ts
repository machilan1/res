import { Exclude } from 'class-transformer';

export class Campus {
  campusId!: number;
  name!: string;
  @Exclude()
  deletedAt!: Date;
  constructor(data: Campus) {
    Object.assign(this, data);
  }
}
