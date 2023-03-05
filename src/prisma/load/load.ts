import { PrismaClient, ImageType } from '@prisma/client';
import { Config } from '../../config/config';
import * as fs from 'fs';
import * as path from 'path';
import { MediaType, PageResponse } from './types';

const prisma = new PrismaClient();
const config = new Config();

const fileNameFromURL = (url: string) => url.split('?')[0].split('/').pop();

export const loadFile = async (file: string) => {
  const jsonData = JSON.parse(fs.readFileSync(file, 'utf8')) as PageResponse;
  const user = jsonData.user;

  await prisma.user.upsert({
    where: { pk: user.pk },
    update: {},
    create: {
      pk: user.pk,
      userName: user.username,
      fullName: user.full_name,
      profile_pic_url: user.profile_pic_url,
    },
  });

  const images = jsonData.items
    .map((item) => {
      if (item.media_type === MediaType.Image) {
        return {
          id: item.id,
          pk: item.pk,
          fileName: fileNameFromURL(
            item.image_versions2.candidates[0].url.split('/').pop(),
          ),
          userId: user.pk,
          imageType: ImageType.UNKNOWN,
          imgUrl: item.image_versions2.candidates[0].url,
        };
      } else if (item.media_type === MediaType.Album) {
        return item.carousel_media.map((carouselItem) => {
          return {
            id: carouselItem.id,
            pk: carouselItem.pk,
            fileName: fileNameFromURL(
              carouselItem.image_versions2.candidates[0].url.split('/').pop(),
            ),
            userId: user.pk,
            imageType: ImageType.UNKNOWN,
            imgUrl: carouselItem.image_versions2.candidates[0].url,
          };
        });
      }
      return null;
    })
    .filter((item) => item !== null)
    .flatMap((item) => item);

  await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
  });
};

async function main() {
  console.log('Start loading data ...');

  const folderPath = path.join(config.loadDataPath, 'meta');

  if (!fs.existsSync(folderPath)) {
    console.log(
      'No data to load 😐, folder not found: ' +
        path.join(config.loadDataPath, 'meta'),
    );
  }

  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    if (!file.endsWith('.json')) {
      continue;
    }
    console.log('🔥 Loading file: ' + file);
    await loadFile(path.join(folderPath, file));
  }

  console.log('🔥 Loading finished');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
