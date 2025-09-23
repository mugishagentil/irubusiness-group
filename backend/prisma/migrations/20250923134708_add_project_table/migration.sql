-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "public"."ContactMessageStatus" AS ENUM ('read', 'unread');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('planning', 'active', 'completed', 'onHold');

-- CreateEnum
CREATE TYPE "public"."ProjectPriority" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "public"."InterviewApplication" ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."PartnershipApplication" ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "client" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."ProjectStatus" NOT NULL DEFAULT 'planning',
    "priority" "public"."ProjectPriority" NOT NULL DEFAULT 'medium',
    "budget" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "category" VARCHAR(100) NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
