/*
  Warnings:

  - Made the column `appKey` on table `Environment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Environment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Environment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totp_code` on table `Environment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Environment" ALTER COLUMN "appKey" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "totp_code" SET NOT NULL;
