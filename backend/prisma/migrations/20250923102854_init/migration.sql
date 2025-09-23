-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'interviewer', 'partner');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('English', 'Kinyarwanda', 'French', 'Swahili', 'Other');

-- CreateEnum
CREATE TYPE "public"."Sensitivity" AS ENUM ('No', 'Yes', 'Unsure');

-- CreateEnum
CREATE TYPE "public"."Format" AS ENUM ('InStudio', 'OnLocation', 'Remote', 'NoPreference');

-- CreateEnum
CREATE TYPE "public"."Duration" AS ENUM ('Min10to15', 'Min20to30', 'Min45to60', 'Over60');

-- CreateEnum
CREATE TYPE "public"."Travel" AS ENUM ('Yes', 'No', 'Maybe');

-- CreateEnum
CREATE TYPE "public"."PartnerType" AS ENUM ('Individual', 'Corporate', 'StrategicNonEquity', 'Other');

-- CreateEnum
CREATE TYPE "public"."BoardRepresentation" AS ENUM ('None', 'Observer', 'OneSeat', 'MultipleSeats');

-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('PassiveInvestor', 'ActivePartnerManagement', 'StrategicAdvisor', 'TechnicalLead');

-- CreateEnum
CREATE TYPE "public"."DividendPreference" AS ENUM ('Reinvest', 'QuarterlyCash', 'AnnualCash', 'ConvertibleInstruments');

-- CreateEnum
CREATE TYPE "public"."PresenceType" AS ENUM ('FullyRemote', 'OccasionalVisits', 'OnSiteLocal');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PasswordResetToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT,
    "language" "public"."Language" NOT NULL DEFAULT 'English',
    "timezone" TEXT,
    "socials" TEXT,
    "headline" VARCHAR(120) NOT NULL,
    "portraitUrl" TEXT,
    "contentTypes" JSONB,
    "pitch" TEXT NOT NULL,
    "sensitivity" "public"."Sensitivity" NOT NULL DEFAULT 'No',
    "sampleLinks" TEXT,
    "suggestedQuestions" TEXT,
    "channels" JSONB NOT NULL,
    "allChannelsReason" TEXT,
    "format" "public"."Format" NOT NULL DEFAULT 'InStudio',
    "duration" "public"."Duration" NOT NULL DEFAULT 'Min20to30',
    "availability" TIMESTAMP(3),
    "travel" "public"."Travel" NOT NULL DEFAULT 'Yes',
    "tech" TEXT,
    "notes" TEXT,
    "consentPublish" BOOLEAN NOT NULL,
    "consentRules" BOOLEAN NOT NULL,
    "consentContact" BOOLEAN,
    "signatureUrl" TEXT,
    "uploadDocsUrls" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PartnershipApplication" (
    "id" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "type" "public"."PartnerType" NOT NULL,
    "project" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "equity" DOUBLE PRECISION NOT NULL,
    "nonCash" TEXT[],
    "contribOther" TEXT,
    "board" "public"."BoardRepresentation" NOT NULL,
    "veto" TEXT,
    "roleType" "public"."RoleType" NOT NULL,
    "kpis" TEXT,
    "dividend" "public"."DividendPreference" NOT NULL,
    "exit" TEXT,
    "docs" TEXT[],
    "ip" TEXT,
    "ethics" TEXT,
    "timeline" TEXT,
    "presence" "public"."PresenceType" NOT NULL,
    "team" TEXT,
    "signature" TEXT,
    "agree" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnershipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_userId_key" ON "public"."PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "public"."PasswordResetToken"("tokenHash");

-- AddForeignKey
ALTER TABLE "public"."PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
