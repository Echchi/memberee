/*
  Warnings:

  - Added the required column `workerId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_num_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- DropIndex
DROP INDEX "User_userid_key";

-- AlterTable
ALTER TABLE "LessonFee" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "companyId" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "workerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WorkerChangeLog" (
    "id" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "changedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previousWorkerId" INTEGER NOT NULL,

    CONSTRAINT "WorkerChangeLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkerChangeLog_workerId_idx" ON "WorkerChangeLog"("workerId");

-- CreateIndex
CREATE INDEX "WorkerChangeLog_memberId_idx" ON "WorkerChangeLog"("memberId");

-- CreateIndex
CREATE INDEX "WorkerChangeLog_changedDate_idx" ON "WorkerChangeLog"("changedDate");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Company_num_idx" ON "Company"("num");

-- CreateIndex
CREATE INDEX "Member_name_idx" ON "Member"("name");

-- CreateIndex
CREATE INDEX "Member_phone_idx" ON "Member"("phone");

-- CreateIndex
CREATE INDEX "Payment_forYear_forMonth_idx" ON "Payment"("forYear", "forMonth");

-- CreateIndex
CREATE INDEX "Schedule_dayOfWeek_idx" ON "Schedule"("dayOfWeek");

-- CreateIndex
CREATE INDEX "User_userid_idx" ON "User"("userid");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");

-- CreateIndex
CREATE INDEX "Worker_name_idx" ON "Worker"("name");

-- CreateIndex
CREATE INDEX "Worker_phone_idx" ON "Worker"("phone");

-- AddForeignKey
ALTER TABLE "WorkerChangeLog" ADD CONSTRAINT "WorkerChangeLog_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerChangeLog" ADD CONSTRAINT "WorkerChangeLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
