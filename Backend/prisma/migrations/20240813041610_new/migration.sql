/*
  Warnings:

  - Made the column `conversationId` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_conversationId_fkey";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "conversationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
