
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ImageType {
    UNKNOWN = "UNKNOWN",
    DUCK = "DUCK",
    NOT_DUCK = "NOT_DUCK"
}

export interface IQuery {
    nonVerifiedImages(): Image[] | Promise<Image[]>;
    nonVerifiedImage(): Image | Promise<Image>;
    verifiedImages(): Image[] | Promise<Image[]>;
    users(): User[] | Promise<User[]>;
    imageById(id: string): Image | Promise<Image>;
    stats(): Stats | Promise<Stats>;
}

export interface Stats {
    totalImages: number;
    totalVerifiedImages: number;
    totalNonVerifiedImages: number;
    totalUsers: number;
    totalDucks: number;
    totalNotDucks: number;
}

export interface IMutation {
    verifyImage(id: string, imageType?: Nullable<ImageType>): Image | Promise<Image>;
    undoVerifyImage(id: string): Image | Promise<Image>;
}

export interface Image {
    id: string;
    pk: string;
    fileName: string;
    imgUrl: string;
    user: User;
    imageType: ImageType;
    verified: boolean;
    verifiedAt: string;
}

export interface User {
    pk: string;
    userName: string;
    fullName: string;
    profile_pic_url: string;
}

type Nullable<T> = T | null;
