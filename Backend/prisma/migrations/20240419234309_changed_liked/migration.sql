/*
  Warnings:

  - Added the required column `caption` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useremail` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userimage` to the `Liked` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Liked` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Liked" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "useremail" TEXT NOT NULL,
ADD COLUMN     "userimage" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
