/*
  Warnings:

  - You are about to drop the column `careTypes` on the `Care` table. All the data in the column will be lost.
  - Added the required column `careType` to the `Care` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Care" DROP COLUMN "careTypes",
ADD COLUMN     "careType" TEXT NOT NULL;
