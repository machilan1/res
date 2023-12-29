import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import {
  AccessRoles,
  GetCurrentUser,
  OwnerGuard,
  OwnerOf,
  RoleGuard,
} from '@res/api-shared';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @AccessRoles(['student'])
  @ApiOperation({ operationId: 'createFavorite' })
  async create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @GetCurrentUser() user: { userId: number; role: string },
  ): Promise<Favorite> {
    const res = await this.favoriteService.create(
      user.userId,
      createFavoriteDto,
    );

    return res;
  }

  @Delete(':favoriteId')
  @ApiBearerAuth()
  @UseGuards(OwnerGuard, RoleGuard)
  @AccessRoles(['student'])
  @OwnerOf('favorites')
  @ApiOperation({ operationId: 'deleteFavorite' })
  async delete(@Param('favoriteId') favoriteId: number): Promise<Favorite> {
    const res = await this.favoriteService.delete(favoriteId);

    return res;
  }
}
