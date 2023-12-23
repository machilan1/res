import {
  UseInterceptors,
  Controller,
  Post,
  UploadedFile,
  BadRequestException,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { UploadResponse } from './upload.response';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MAX_FILE_SIZE_IN_BYTES } from '@res/shared';

@ApiTags('files')
@Controller('files')
export class FileController {
  @Post('upload')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'uploadFile' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES })
        .build()
    )
    file: Express.Multer.File
  ): Promise<UploadResponse> {
    if (file instanceof Error) {
      throw new BadRequestException();
    } else {
      return new UploadResponse(file);
    }
  }
}
