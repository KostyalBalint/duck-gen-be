export enum MediaType {
  Image = 1,
  Video = 2,
  Album = 8,
}

type BaseItem = {
  id: string;
  pk: string;
  caption: {
    text: string;
  };
  original_width: number;
  original_height: number;
};

type RawImageItem = {
  id: string;
  pk: string;
  image_versions2: {
    candidates: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  media_type: MediaType.Image;
};

type CarouselItem = {
  carousel_media: RawImageItem[];
  media_type: MediaType.Album;
} & BaseItem;

type ImageItem = RawImageItem & BaseItem;

export type PostItem = CarouselItem | ImageItem;

export interface PageResponse {
  items: PostItem[];
  next_max_id: string;
  status: string; //ok
  more_available: boolean;
  user: {
    full_name: string;
    is_private: boolean;
    is_verified: boolean;
    pk: string;
    pk_id: string;
    profile_grid_display_type: string;
    profile_pic_id: string;
    profile_pic_url: string;
    username: string;
  };
}
