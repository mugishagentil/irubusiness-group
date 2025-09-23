// src/services/partnershipApplication.service.ts
import { PrismaClient } from "@prisma/client";
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
  static async findById(id: number) {
    return prisma.partnershipApplication.findUnique({
      where: { id },
    });
  }

  // Update a partnership application
  static async update(id: number, data: Partial<CreatePartnershipApplicationInput>) {
    return prisma.partnershipApplication.update({
      where: { id },
      data,
    });
  }

  // Delete a partnership application
  static async delete(id: number) {
    return prisma.partnershipApplication.delete({
      where: { id },
    });
  }
}
