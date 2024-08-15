-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "saved" TEXT[],
    "liked" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
