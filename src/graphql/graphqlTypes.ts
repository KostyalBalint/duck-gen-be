
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ImageType {
    UNKNOWN = "UNKNOWN",
    DUCK = "DUCK"
}

export interface IQuery {
    nonVerifiedImages(): Nullable<Nullable<Image>[]> | Promise<Nullable<Nullable<Image>[]>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface IMutation {
    verifyImage(id: string, imageType?: Nullable<ImageType>): Nullable<Image> | Promise<Nullable<Image>>;
    undoVerifyImage(id: string): Nullable<Image> | Promise<Nullable<Image>>;
}

export interface Image {
    id?: Nullable<string>;
    pk?: Nullable<string>;
    fileName?: Nullable<string>;
    imgUrl?: Nullable<string>;
    user?: Nullable<User>;
    imageType?: Nullable<ImageType>;
    verified?: Nullable<boolean>;
}

export interface User {
    pk?: Nullable<string>;
    userName?: Nullable<string>;
    fullName?: Nullable<string>;
    profile_pic_url?: Nullable<string>;
}

type Nullable<T> = T | null;
