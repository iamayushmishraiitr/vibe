/*
  Warnings:

  - You are about to drop the column `userlikes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `post` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `saved` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userlikes";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "post",
DROP COLUMN "saved";

-- CreateTable
CREATE TABLE "Liked" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Liked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
