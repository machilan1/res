import { Body, Controller, Post } from '@nestjs/common';
import { StudentRegisterDto } from './dtos/student-register.dto';
import { Student } from './entities/student.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('register')
  @ApiOperation({ operationId: 'register' })
  login(@Body() registerDto: StudentRegisterDto): Student {
    return new Student({} as Student);
  }
}
