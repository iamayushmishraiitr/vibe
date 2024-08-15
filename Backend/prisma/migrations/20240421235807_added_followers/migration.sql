-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followers" TEXT[],
ADD COLUMN     "following" TEXT[],
ADD COLUMN     "request" TEXT[],
ALTER COLUMN "image" SET DEFAULT '../src/assets/fileupload.svg';
