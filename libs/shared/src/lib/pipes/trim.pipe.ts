import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values) {
    console.log('---values');
    console.log(values);
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    console.log('---metadata', metadata);
    console.log('---type', type);
    // console.log(this.isObj(values));
    console.log('---values', values);
    if (values && (type === 'param' || type === 'custom')) {
      return this.trim(values);
    }

    if (this.isObj(values) && (type === 'body' || type === 'query')) {
      return this.trim(values);
    }

    throw new BadRequestException('Validation failed');
  }
}
