import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Inline password hashing function for seeding
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Starting seed process...');

  const adminEmail = 'tuyishimenaome27@gmail.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const adminUser = await prisma.user.create({
      data: {
        fullName: 'TUYISHIME Naome',
        email: adminEmail,
        phone: '250793099772',
        role: 'admin',
        password: await hashPassword('Admin@123'),
      },
    });
    console.log('Admin user created:', adminUser);
  } else {
    console.log('Admin user already exists:', existingAdmin);
  }
  console.log('Seed complete');
}

main().finally(() => prisma.$disconnect());