import { Module } from '@nestjs/common';
import { FavoritesController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoriteService],
  exports: [],
})
export class ApiFavoritesModule {}
