import { Module } from '@nestjs/common';
import { FileController } from './files.controller';

@Module({
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class ApiFilesModule {}
