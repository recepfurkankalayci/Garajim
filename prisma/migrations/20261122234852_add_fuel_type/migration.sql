-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT', 'ELEKTRIK');

-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "fuelType" "FuelType" NOT NULL DEFAULT 'BENZIN';
