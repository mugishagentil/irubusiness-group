// src/services/contact.service.ts
import { PrismaClient, ContactMessageStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class ContactService {
  // Create a new contact message
  static async create(data: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return prisma.contactMessage.create({
      data,
    });
    }
    static async findAll() {
    return prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  // Get a single message by ID
  static async findById(id: string) {
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  }

   static async updateStatus(id: string, status: ContactMessageStatus) {
      return prisma.contactMessage.update({
        where: { id },
        data: { status },
      });
  }

  static async delete(id: string) {
    return prisma.partnershipApplication.delete({
      where: { id },
    });
  }
  
}
