import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StatsService } from './stats.service';

@Resolver('Stats')
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  @Query('stats')
  stats() {
    return {};
  }

  @ResolveField('totalImages')
  totalImages() {
    return this.statsService.getTotalImageCount();
  }

  @ResolveField('totalVerifiedImages')
  totalVerifiedImages() {
    return this.statsService.getTotalVerifiedImageCount();
  }

  @ResolveField('totalNonVerifiedImages')
  totalNonVerifiedImages() {
    return this.statsService.getTotalNonVerifiedImageCount();
  }

  @ResolveField('totalUsers')
  totalUsers() {
    return this.statsService.getTotalUserCount();
  }

  @ResolveField('verifiedDucks')
  verifiedDucks() {
    return this.statsService.getVerifiedDucks();
  }

  @ResolveField('verifiedNotDucks')
  verifiedNotDucks() {
    return this.statsService.getVerifiedNotDucks();
  }
}
