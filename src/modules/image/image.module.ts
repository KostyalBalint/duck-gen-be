import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [ImageService, ImageResolver, PrismaService],
})
export class ImageModule {}
