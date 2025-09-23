import { PrismaClient } from "@prisma/client";
import { CreateProjectInput } from "../types/other.dto";

const prisma = new PrismaClient();

export class ProjectService {
  static async create(data: CreateProjectInput) {
    return prisma.project.create({ data });
  }

  static async findAll() {
    return prisma.project.findMany();
  }

  static async findById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  }

  static async update(id: string, data: Partial<CreateProjectInput>) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.project.delete({ where: { id } });
  }
}
