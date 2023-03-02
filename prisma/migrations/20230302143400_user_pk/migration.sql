/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pk]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileName` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pk` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
DROP COLUMN "name",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "pk" VARCHAR(30) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Image_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pk" SET DATA TYPE VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "Image_pk_key" ON "Image"("pk");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
