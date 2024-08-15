/*
  Warnings:

  - Added the required column `action` to the `Liked` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Liked" ADD COLUMN     "action" TEXT NOT NULL;
