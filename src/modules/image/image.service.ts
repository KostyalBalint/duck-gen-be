import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';
import { ImageType } from '../../graphql/graphqlTypes';

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}
  async getRandomNonVerifiedImages() {
    return await this.prismaService
      .$queryRaw`SELECT * FROM "Image" WHERE "verified" = false AND "imageType" = \'UNKNOWN\' ORDER BY RANDOM() LIMIT 30`;
  }

  async getRandomNonVerifiedImage() {
    return (
      await this.prismaService
        .$queryRaw`SELECT * FROM "Image" WHERE "verified" = false AND "imageType" = \'UNKNOWN\' ORDER BY RANDOM() LIMIT 1`
    )[0];
  }

  getImageById(id: string) {
    return this.prismaService.image.findUnique({ where: { id } });
  }

  getUserByImageId(id?: string) {
    if (!id) {
      return null;
    }
    return this.prismaService.image.findUnique({ where: { id } }).user();
  }

  verifyImage(id: string, imageType: ImageType) {
    return this.prismaService.image.update({
      where: { id },
      data: { verified: true, imageType, verifiedAt: new Date() },
    });
  }

  getVerifiedImages() {
    return this.prismaService.image.findMany({
      where: { verified: true },
      orderBy: { verifiedAt: 'desc' },
    });
  }

  unVerifyImage(id: string) {
    return this.prismaService.image.update({
      where: { id },
      data: { verified: false, imageType: 'UNKNOWN' },
    });
  }
}
