/*
  Warnings:

  - You are about to drop the column `enabled` on the `authorized_users_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authorized_users_tokens" DROP COLUMN "enabled",
ADD COLUMN     "access_enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "refresh_enabled" BOOLEAN NOT NULL DEFAULT true;
