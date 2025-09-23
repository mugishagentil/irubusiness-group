// server/routes/application.routes.ts
import { Router } from "express";
import { InterviewApplicationController } from "../controllers/interview.controller";
import { PartnershipApplicationController } from "../controllers/partner.controller";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

/**
 * @openapi
 * /api/applications/interviews:
 *   post:
 *     summary: Create new interview application
 *     tags: [InterviewApplications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInterviewApplicationInput'
 *     responses:
 *       201:
 *         description: Interview application created
 */
router.post(
  "/interviews",
  InterviewApplicationController.create
);

/**
 * @openapi
 * /api/applications/interviews:
 *   get:
 *     summary: Get all interview applications
 *     tags: [InterviewApplications]
 *     responses:
 *       200:
 *         description: List of interview applications
 */
router.get("/interviews", requireAuth,requireRole('admin'),InterviewApplicationController.getAll);

/**
 * @openapi
 * /api/applications/interviews/{id}:
 *   get:
 *     summary: Get a single interview application
 *     tags: [InterviewApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interview application retrieved
 */
router.get("/interviews/:id",requireAuth,requireRole('admin'), InterviewApplicationController.getById);

/**
 * @openapi
 * /api/applications/interviews/{id}:
 *   patch:
 *     summary: Update interview application
 *     tags: [InterviewApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInterviewApplicationInput'
 *     responses:
 *       200:
 *         description: Interview application updated
 */
router.patch("/interviews/:id",requireAuth,requireRole('admin'), InterviewApplicationController.update);

/**
 * @openapi
 * /api/applications/interviews/{id}:
 *   delete:
 *     summary: Delete interview application
 *     tags: [InterviewApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Interview application deleted
 */
router.delete("/interviews/:id", requireAuth,requireRole('admin'),InterviewApplicationController.delete);

/**
 * @openapi
 * /api/applications/partners:
 *   post:
 *     summary: Create new partnership application
 *     tags: [PartnershipApplications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePartnershipApplicationInput'
 *     responses:
 *       201:
 *         description: Partnership application created
 */
router.post(
  "/partners",
  PartnershipApplicationController.create
);

/**
 * @openapi
 * /api/applications/partners:
 *   get:
 *     summary: Get all partnership applications
 *     tags: [PartnershipApplications]
 *     responses:
 *       200:
 *         description: List of partnership applications
 */
router.get("/partners", requireAuth,requireRole('admin'),PartnershipApplicationController.findAll);

/**
 * @openapi
 * /api/applications/partners/{id}:
 *   get:
 *     summary: Get a single partnership application
 *     tags: [PartnershipApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partnership application retrieved
 */
router.get("/partners/:id", requireAuth,requireRole('admin'),PartnershipApplicationController.findById);

/**
 * @openapi
 * /api/applications/partners/{id}:
 *   patch:
 *     summary: Update partnership application
 *     tags: [PartnershipApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePartnershipApplicationInput'
 *     responses:
 *       200:
 *         description: Partnership application updated
 */
router.patch("/partners/:id", requireAuth,requireRole('admin'),PartnershipApplicationController.update);

/**
 * @openapi
 * /api/applications/partners/{id}:
 *   delete:
 *     summary: Delete partnership application
 *     tags: [PartnershipApplications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Partnership application deleted
 */
router.delete("/partners/:id",requireAuth,requireRole('admin'), PartnershipApplicationController.delete);

export default router;
