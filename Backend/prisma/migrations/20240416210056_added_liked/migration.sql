/*
  Warnings:

  - You are about to drop the column `liked` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `liked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `post` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useremail` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "liked",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "useremail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "liked",
DROP COLUMN "post";

-- CreateTable
CREATE TABLE "Liked" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Liked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
