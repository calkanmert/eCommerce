/*
  Warnings:

  - You are about to drop the column `updated_at` on the `authorized_users_tokens` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `authorized_users_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authorized_users_tokens" DROP COLUMN "updated_at",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
