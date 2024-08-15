-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT 'Add Bio Here',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT './src/assets/fileupload.svg',
ADD COLUMN     "liked" TEXT[],
ADD COLUMN     "post" TEXT[],
ADD COLUMN     "saved" TEXT[];
