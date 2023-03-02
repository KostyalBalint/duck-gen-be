import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prismService: PrismaService) {}

  async findAll() {
    return await this.prismService.user.findMany();
  }
}
