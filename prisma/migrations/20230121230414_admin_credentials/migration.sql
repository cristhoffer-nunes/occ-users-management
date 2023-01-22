-- AlterTable
ALTER TABLE "Environment" ADD COLUMN     "email" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "totp_code" TEXT,
ALTER COLUMN "appKey" DROP NOT NULL;
