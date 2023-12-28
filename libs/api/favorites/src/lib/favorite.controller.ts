import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createFavorite' })
  async create(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite> {
    const res = await this.favoriteService.create(createFavoriteDto);

    return res;
  }

  @Delete(':favoriteId')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'deleteFavorite' })
  async delete(@Param('favoriteId') favoriteId: number): Promise<Favorite> {
    const res = await this.favoriteService.delete(favoriteId);

    return res;
  }
}
