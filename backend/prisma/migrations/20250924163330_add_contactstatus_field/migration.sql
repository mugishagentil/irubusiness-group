-- AlterTable
ALTER TABLE "public"."ContactMessage" ADD COLUMN     "status" "public"."ContactMessageStatus" NOT NULL DEFAULT 'unread';
