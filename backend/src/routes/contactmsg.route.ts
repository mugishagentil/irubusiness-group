// src/routes/contact.routes.ts
import { Router } from "express";
import { ContactController } from "../controllers/contactmsg.controller";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

/**
 * @openapi
 * /api/contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - subject
 *               - message
 *     responses:
 *       201:
 *         description: Message submitted successfully
 */
router.post("/", ContactController.create);

/**
 * @openapi
 * /api/contact:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of contact messages
 */
router.get("/",requireAuth,requireRole('admin'),ContactController.findAll);

/**
 * @openapi
 * /api/contact/{id}:
 *   get:
 *     summary: Get a contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact message
 *     responses:
 *       200:
 *         description: Contact message retrieved successfully
 *       404:
 *         description: Message not found
 */
router.get("/:id",requireAuth,requireRole('admin'),ContactController.findById);

export default router;
