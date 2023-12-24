export class Student {
  userId!: number;
  studentNumber!: string;
  role!: string;

  constructor(data: Student) {
    Object.assign(this, data);
    this.studentNumber = data.studentNumber.toUpperCase();
  }
}
