import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  getTotalImageCount() {
    return this.prismaService.image.count();
  }

  getTotalVerifiedImageCount() {
    return this.prismaService.image.count({ where: { verified: true } });
  }

  getTotalNonVerifiedImageCount() {
    return this.prismaService.image.count({ where: { verified: false } });
  }

  getTotalUserCount() {
    return this.prismaService.user.count();
  }

  getVerifiedDucks() {
    return this.prismaService.image.count({
      where: { verified: true, imageType: 'DUCK' },
    });
  }

  getVerifiedNotDucks() {
    return this.prismaService.image.count({
      where: { verified: true, imageType: 'NOT_DUCK' },
    });
  }
}
