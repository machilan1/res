export class RentingRecord {
  rentingRecordId!: number;
  rentingId!: number;
  createdAt!: Date;
  studentId!: number;

  constructor(data: RentingRecord) {
    const { rentingRecordId, rentingId, createdAt, studentId } = data;

    Object.assign(this, { rentingRecordId, rentingId, createdAt, studentId });
  }
}
