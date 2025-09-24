// server/routes/application.routes.ts
import { Router } from "express";
import { InterviewApplicationController } from "../controllers/interview.controller";
import { PartnershipApplicationController } from "../controllers/partner.controller";
import { requireAuth } from "../middlewares/auth";
import { requireRole } from "../middlewares/requireRole";
import { upload } from "../middlewares/upload";

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 example: "+250793099772"
 *               city:
 *                 type: string
 *                 example: "Kigali"
 *               language:
 *                 type: string
 *                 example: "English"
 *               timezone:
 *                 type: string
 *                 example: "Africa/Kigali"
 *               socials:
 *                 type: string
 *                 example: "http://linkedin.com/johndoe"
 *               headline:
 *                 type: string
 *                 example: "My Interview Headline"
 *               portraitUrl:
 *                 type: string
 *                 format: binary
 *               signatureUrl:
 *                 type: string
 *                 format: binary
 *               contentTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Life story"]
 *               pitch:
 *                 type: string
 *               sensitivity:
 *                 type: string
 *                 example: "Yes"
 *               sampleLinks:
 *                 type: string
 *               suggestedQuestions:
 *                 type: string
 *               channels:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["IRU TV"]
 *               allChannelsReason:
 *                 type: string
 *               format:
 *                 type: string
 *                 example: "In-studio"
 *               duration:
 *                 type: string
 *                 example: "20–30 min"
 *               availability:
 *                 type: string
 *                 format: date-time
 *               travel:
 *                 type: string
 *                 example: "Yes"
 *               tech:
 *                 type: string
 *               notes:
 *                 type: string
 *               consentPublish:
 *                 type: boolean
 *               consentRules:
 *                 type: boolean
 *               consentContact:
 *                 type: boolean
 *               uploadDocsUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - headline
 *               - pitch
 *               - channels
 *               - consentPublish
 *               - consentRules
 *     responses:
 *       201:
 *         description: Interview application created
 */
router.post(
  "/interviews",
  upload.fields([
    { name: "portraitUrl", maxCount: 1 },
    { name: "signatureUrl", maxCount: 1 }, 
    { name: "uploadDocsUrls", maxCount: 5 },
  ]),
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
router.get("/interviews", requireAuth, requireRole('admin'), InterviewApplicationController.getAll);

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
router.get("/interviews/:id", requireAuth, requireRole('admin'), InterviewApplicationController.getById);

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
router.delete("/interviews/:id", requireAuth, requireRole('admin'), InterviewApplicationController.delete);

/**
 * @openapi
 * /api/applications/interviews/{id}/status:
 *   patch:
 *     summary: Update interview application status
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Interview application status updated
 */
router.patch("/interviews/:id/status", requireAuth, requireRole('admin'), InterviewApplicationController.updateStatus);

// -------------------- PARTNERSHIP APPLICATION ROUTES --------------------

/**
 * @openapi
 * /api/applications/partners:
 *   post:
 *     summary: Create new partnership application
 *     tags: [PartnershipApplications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "My Company"
 *               contactPerson:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 example: "+250788123456"
 *               website:
 *                 type: string
 *                 example: "https://mycompany.com"
 *               message:
 *                 type: string
 *               docs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - companyName
 *               - contactPerson
 *               - email
 *               - phone
 */
router.post("/partners", upload.array("docs", 5), PartnershipApplicationController.create);

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
router.get("/partners", requireAuth, requireRole('admin'), PartnershipApplicationController.findAll);

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
 *           type: string
 *     responses:
 *       200:
 *         description: Partnership application retrieved
 */
router.get("/partners/:id", requireAuth, requireRole('admin'), PartnershipApplicationController.findById);

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
 *           type: string
 *     responses:
 *       204:
 *         description: Partnership application deleted
 */
router.delete("/partners/:id", requireAuth, requireRole('admin'), PartnershipApplicationController.delete);

/**
 * @openapi
 * /api/applications/partners/{id}/status:
 *   patch:
 *     summary: Update partnership application status
 *     tags: [PartnershipApplications]
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Partnership application status updated
 */
router.patch("/partners/:id/status", requireAuth, requireRole('admin'), PartnershipApplicationController.updateStatus);

export default router;
