import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
  imports: [],
  exports: [],
})
export class AuthModule {}
