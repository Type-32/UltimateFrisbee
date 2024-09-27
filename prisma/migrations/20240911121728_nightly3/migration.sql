/*
  Warnings:

  - You are about to drop the column `galleryId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_galleryId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "galleryId";

-- CreateTable
CREATE TABLE "MediaOnGalleries" (
    "galleryId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MediaOnGalleries_pkey" PRIMARY KEY ("galleryId","mediaId")
);

-- AddForeignKey
ALTER TABLE "MediaOnGalleries" ADD CONSTRAINT "MediaOnGalleries_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnGalleries" ADD CONSTRAINT "MediaOnGalleries_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
