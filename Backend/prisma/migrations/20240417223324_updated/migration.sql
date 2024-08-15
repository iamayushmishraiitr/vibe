-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId2_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "authorId2" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId2_fkey" FOREIGN KEY ("authorId2") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
