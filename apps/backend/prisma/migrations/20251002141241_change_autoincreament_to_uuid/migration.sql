/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Blog" DROP CONSTRAINT "Blog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Blog_id_seq";

-- AlterTable
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "blogId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "public"."Reaction" DROP CONSTRAINT "Reaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "blogId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reaction_id_seq";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reaction" ADD CONSTRAINT "Reaction_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
