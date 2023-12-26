import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { Student } from './entity/students.entity';
import { student } from '@res/api-database';
import { UpdateStudentDto } from './dtos/update-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getStudents' })
  async getStudents(): Promise<Student[]> {
    const res = await this.studentService.getStudents();
    return res;
  }

  @Get(':studentId')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getStudentById' })
  async getStudentById(
    @Param('studentId', ParseIntPipe) studentId: number
  ): Promise<Student> {
    const res = await this.studentService.getStudentById(studentId);
    return res;
  }

  @Patch(':studentId')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'updateStudent' })
  async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
    @Param('studentId', ParseIntPipe) studentId: number
  ) {
    const res = await this.studentService.updateStudent(
      studentId,
      updateStudentDto
    );

    return res;
  }

  @Delete(':studentId')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'deleteUser' })
  async deleteStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    const res = await this.studentService.deleteStudent(studentId);
    return res;
  }
}
