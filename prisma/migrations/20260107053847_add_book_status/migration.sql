-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'BORROWED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE';
