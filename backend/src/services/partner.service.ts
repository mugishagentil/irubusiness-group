// src/services/partnershipApplication.service.ts
import { PrismaClient, ApplicationStatus } from "@prisma/client";
import { CreatePartnershipApplicationInput } from "../types/other.dto";

const prisma = new PrismaClient();

export class PartnershipApplicationService {
  // Create new partnership application
  static async create(data: CreatePartnershipApplicationInput) {
    return prisma.partnershipApplication.create({
      data,
    });
  }

  // Get all partnership applications
  static async findAll() {
    return prisma.partnershipApplication.findMany();
  }

  // Get single partnership application by ID
  static async findById(id: string) {
    return prisma.partnershipApplication.findUnique({
      where: { id },
    });
  }

    static async updateStatus(id: string, status: ApplicationStatus) {
    return prisma.interviewApplication.update({
      where: { id },
      data: { status },
    });
  }

  // Delete a partnership application
  static async delete(id: string) {
    return prisma.partnershipApplication.delete({
      where: { id },
    });
  }
}
