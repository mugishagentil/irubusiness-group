// src/services/interviewApplication.service.ts
import { PrismaClient } from "@prisma/client";
import { CreateInterviewApplicationInput } from "../types/other.dto";

const prisma = new PrismaClient();

export class InterviewApplicationService {
  // Create a new interview application
  static async create(data: CreateInterviewApplicationInput) {
    // Ensure optional JSON fields have defaults
    const prismaData = {
      ...data,
      channels: data.channels || [], // required field
      contentTypes: data.contentTypes || null,
      uploadDocsUrls: data.uploadDocsUrls || null,
      availability: data.availability ? new Date(data.availability) : null, // convert string to Date
      language: data.language || "English",
      sensitivity: data.sensitivity || "No",
      format: data.format || "InStudio",
      duration: data.duration || "Min20to30",
      travel: data.travel || "Yes",
    };

    return prisma.interviewApplication.create({
      data: prismaData,
    });
  }

  // Get all interview applications
  static async findAll() {
    return prisma.interviewApplication.findMany();
  }

  // Get a single interview application by ID
  static async findById(id: string) {
    return prisma.interviewApplication.findUnique({
      where: { id },
    });
  }

  // Update an existing interview application
  static async update(
    id: string,
    data: Partial<CreateInterviewApplicationInput>
  ) {
    const prismaData = {
      ...data,
      availability: data.availability ? new Date(data.availability) : undefined,
    };

    return prisma.interviewApplication.update({
      where: { id },
      data: prismaData,
    });
  }

  // Delete an interview application
  static async delete(id: string) {
    return prisma.interviewApplication.delete({
      where: { id },
    });
  }
}
