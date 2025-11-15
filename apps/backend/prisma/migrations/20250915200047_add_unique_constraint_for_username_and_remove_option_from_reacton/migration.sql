/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Reaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reaction" ALTER COLUMN "type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User"("userName");
