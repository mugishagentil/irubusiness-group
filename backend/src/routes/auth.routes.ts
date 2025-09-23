// server/routes/auth.routes.ts
import { Router } from "express";
import {
  loginCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import {
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../types/auth.dto";

const router = Router();


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", validate(LoginDto), loginCtrl);

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordDto'
 *     responses:
 *       200:
 *         description: Reset token generated
 */
router.post(
  "/forgot-password",
  validate(ForgotPasswordDto),
  forgotPasswordCtrl
);

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDto'
 *     responses:
 *       200:
 *         description: Password has been reset
 */
router.post("/reset-password", validate(ResetPasswordDto), resetPasswordCtrl);

export default router;
