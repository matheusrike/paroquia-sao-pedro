/*
  Warnings:

  - You are about to drop the column `period` on the `catechism_classes` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `catechism_classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `catechism_classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `catechism_classes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `catechism_classes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DaysOfWeek" AS ENUM ('MON', 'THU', 'WED', 'TUE', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "catechism_classes" DROP COLUMN "period",
ADD COLUMN     "dayOfWeek" "DaysOfWeek" NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL;
