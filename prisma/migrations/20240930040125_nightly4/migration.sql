/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Gallery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_categoryId_fkey";

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "CategoryOnGalleries" (
    "galleryId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoryOnGalleries_pkey" PRIMARY KEY ("galleryId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoryOnGalleries" ADD CONSTRAINT "CategoryOnGalleries_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnGalleries" ADD CONSTRAINT "CategoryOnGalleries_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
