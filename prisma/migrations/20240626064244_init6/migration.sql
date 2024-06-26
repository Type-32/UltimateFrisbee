/*
  Warnings:

  - Added the required column `guestTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "banner" TEXT;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "guestTeamId" INTEGER NOT NULL,
ADD COLUMN     "guest_score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeTeamId" INTEGER NOT NULL,
ADD COLUMN     "home_score" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_guestTeamId_fkey" FOREIGN KEY ("guestTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
