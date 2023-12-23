import { Exclude, Expose } from 'class-transformer';
import { join } from 'path';

@Exclude()
export class UploadResponse {
  @Expose()
  path!: string;

  constructor(data: UploadResponse) {
    Object.assign(this, data);

    this.path = this.path.replace(join(__dirname, '..', 'uploads'), '');
  }
}
