/*
  Warnings:

  - The `birth` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `date` on the `Memo` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `ScheduleId` on the `Salary` table. All the data in the column will be lost.
  - You are about to drop the column `lessonFeeId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `WorkerMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lessonFee` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_ScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_lessonFeeId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerMember" DROP CONSTRAINT "WorkerMember_memberId_fkey";

-- DropForeignKey
ALTER TABLE "WorkerMember" DROP CONSTRAINT "WorkerMember_workerId_fkey";

-- DropIndex
DROP INDEX "Member_phone_key";

-- DropIndex
DROP INDEX "Salary_ScheduleId_idx";

-- DropIndex
DROP INDEX "Schedule_lessonFeeId_idx";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "companyId" INTEGER,
DROP COLUMN "birth",
ADD COLUMN     "birth" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
DROP COLUMN "dueDate",
DROP COLUMN "isPaid",
ADD COLUMN     "lessonFee" INTEGER,
ADD COLUMN     "memo" TEXT,
ALTER COLUMN "forYear" DROP NOT NULL,
ALTER COLUMN "forMonth" DROP NOT NULL,
ALTER COLUMN "paymentDate" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "ScheduleId",
ALTER COLUMN "salaryPayment" DROP NOT NULL,
ALTER COLUMN "tax" DROP NOT NULL,
ALTER COLUMN "lessonCount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "lessonFeeId",
ADD COLUMN     "lessonFee" INTEGER NOT NULL,
ADD COLUMN     "salaryId" INTEGER;

-- DropTable
DROP TABLE "WorkerMember";

-- CreateIndex
CREATE INDEX "Member_companyId_idx" ON "Member"("companyId");

-- CreateIndex
CREATE INDEX "Schedule_salaryId_idx" ON "Schedule"("salaryId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES "Salary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
