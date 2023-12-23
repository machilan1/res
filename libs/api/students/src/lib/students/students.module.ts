import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentService],
  imports: [],
  exports: [],
})
export class StudentsModule {}
