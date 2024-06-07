-- CreateEnum
CREATE TYPE "SurveyTopic" AS ENUM ('HEALTH', 'WEALTH');

-- AlterTable
ALTER TABLE "survey" ADD COLUMN     "topic" "SurveyTopic";
