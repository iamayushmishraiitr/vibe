/*
  Warnings:

  - You are about to drop the column `action` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `useremail` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `userimage` on the `Liked` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Liked` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Liked" DROP COLUMN "action",
DROP COLUMN "caption",
DROP COLUMN "imageUrl",
DROP COLUMN "location",
DROP COLUMN "tags",
DROP COLUMN "useremail",
DROP COLUMN "userimage",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "Saved" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Saved_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saved_userId_key" ON "Saved"("userId");

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
