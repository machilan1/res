import { Module } from '@nestjs/common';
import { JwtGuard } from './jwt.guards';

@Module({
  controllers: [],
  providers: [JwtGuard],
  exports: [JwtGuard],
})
export class GuardsModule {}
