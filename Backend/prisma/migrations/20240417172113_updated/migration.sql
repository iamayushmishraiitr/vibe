/*
  Warnings:

  - You are about to drop the column `saved` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `saved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Liked` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId2` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "saved",
ADD COLUMN     "authorId2" INTEGER NOT NULL,
ADD COLUMN     "liked" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "saved",
ADD COLUMN     "post" TEXT[];

-- DropTable
DROP TABLE "Liked";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId2_fkey" FOREIGN KEY ("authorId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
