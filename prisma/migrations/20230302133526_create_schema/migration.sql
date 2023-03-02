-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('UNKNOWN', 'DUCK');

-- CreateTable
CREATE TABLE "User" (
    "pk" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profile_pic_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageType" "ImageType" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pk_key" ON "User"("pk");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
