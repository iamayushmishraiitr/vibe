/*
  Warnings:

  - You are about to drop the column `postId` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Saved` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Saved` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_postId_fkey";

-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_userId_fkey";

-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_postId_fkey";

-- DropForeignKey
ALTER TABLE "Saved" DROP CONSTRAINT "Saved_userId_fkey";

-- DropIndex
DROP INDEX "Saved_userId_key";

-- AlterTable
ALTER TABLE "Liked" DROP COLUMN "postId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Saved" DROP COLUMN "postId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_PostToSaved" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToSaved_AB_unique" ON "_PostToSaved"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToSaved_B_index" ON "_PostToSaved"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedToUser_AB_unique" ON "_LikedToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedToUser_B_index" ON "_LikedToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedToPost_AB_unique" ON "_LikedToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedToPost_B_index" ON "_LikedToPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedToUser_AB_unique" ON "_SavedToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedToUser_B_index" ON "_SavedToUser"("B");

-- AddForeignKey
ALTER TABLE "_PostToSaved" ADD CONSTRAINT "_PostToSaved_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToSaved" ADD CONSTRAINT "_PostToSaved_B_fkey" FOREIGN KEY ("B") REFERENCES "Saved"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedToUser" ADD CONSTRAINT "_LikedToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Liked"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedToUser" ADD CONSTRAINT "_LikedToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedToPost" ADD CONSTRAINT "_LikedToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Liked"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedToPost" ADD CONSTRAINT "_LikedToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedToUser" ADD CONSTRAINT "_SavedToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Saved"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedToUser" ADD CONSTRAINT "_SavedToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
