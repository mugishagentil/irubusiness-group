// server/services/auth.service.ts
import { PrismaClient, UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { hashPassword, verifyPassword } from "../utils/passwords";

const prisma = new PrismaClient();

/** Generate JWT access token */
export function signAccessToken(user: {
  id: string;
  email: string;
  role: UserRole;
}) {
  const signOptions: jwt.SignOptions = {};
  if (
    typeof env.jwtExpiresIn === "string" ||
    typeof env.jwtExpiresIn === "number"
  ) {
    signOptions.expiresIn = env.jwtExpiresIn as jwt.SignOptions["expiresIn"];
  }
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    signOptions
  );
}

/** Login user */
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const ok = await verifyPassword(password, user.password);
  if (!ok)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  return signAccessToken(user);
}

/** Start password reset */
export async function startPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return; // avoid leaking user existence

  const rawToken = Math.random().toString(36).substring(2, 18); // simple token
  const hashedToken = await hashPassword(rawToken);
  const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour expiry

  await prisma.passwordResetToken.upsert({
    where: { userId: user.id },
    update: { tokenHash: hashedToken, expiresAt },
    create: { userId: user.id, tokenHash: hashedToken, expiresAt },
  });

  // return token to frontend/email system
  return rawToken;
}

/** Complete password reset */
export async function completePasswordReset(
  token: string,
  newPassword: string
) {
  const record = await prisma.passwordResetToken.findFirst();
  if (!record || record.expiresAt < new Date())
    throw new Error("Invalid or expired token");

  const valid = await verifyPassword(token, record.tokenHash);
  if (!valid) throw new Error("Invalid token");

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({ where: { userId: record.userId } });
}
