import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image, ImageType } from '../../graphql/graphqlTypes';

@Resolver('Image')
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query('nonVerifiedImages')
  nonVerifiedImages() {
    return this.imageService.getRandomNonVerifiedImages();
  }

  @Query('nonVerifiedImage')
  async nonVerifiedImage() {
    return await this.imageService.getRandomNonVerifiedImage();
  }

  @Query('verifiedImages')
  verifiedImages() {
    return this.imageService.getVerifiedImages();
  }

  @Query('imageById')
  imageById(@Args('id') id: string) {
    return this.imageService.getImageById(id);
  }

  @Mutation('verifyImage')
  verifyImage(@Args('id') id: string, @Args('imageType') imageType: ImageType) {
    return this.imageService.verifyImage(id, imageType);
  }

  @Mutation('undoVerifyImage')
  undoVerifyImage(@Args('id') id: string) {
    return this.imageService.unVerifyImage(id);
  }

  @ResolveField('user')
  user(@Parent() image: Image) {
    return this.imageService.getUserByImageId(image.id);
  }
}
