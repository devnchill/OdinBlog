/*
  Warnings:

  - A unique constraint covering the columns `[userId,blogId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_blogId_key" ON "public"."Reaction"("userId", "blogId");
