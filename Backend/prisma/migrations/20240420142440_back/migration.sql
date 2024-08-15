/*
  Warnings:

  - You are about to drop the `Liked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Saved` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikedToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikedToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToSaved` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "_LikedToPost" DROP CONSTRAINT "_LikedToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedToPost" DROP CONSTRAINT "_LikedToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikedToUser" DROP CONSTRAINT "_LikedToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedToUser" DROP CONSTRAINT "_LikedToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostToSaved" DROP CONSTRAINT "_PostToSaved_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToSaved" DROP CONSTRAINT "_PostToSaved_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedToUser" DROP CONSTRAINT "_SavedToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedToUser" DROP CONSTRAINT "_SavedToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "liked" TEXT[],
ADD COLUMN     "saved" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "liked" TEXT[],
ADD COLUMN     "saved" TEXT[];

-- DropTable
DROP TABLE "Liked";

-- DropTable
DROP TABLE "Saved";

-- DropTable
DROP TABLE "_LikedToPost";

-- DropTable
DROP TABLE "_LikedToUser";

-- DropTable
DROP TABLE "_PostToSaved";

-- DropTable
DROP TABLE "_SavedToUser";
