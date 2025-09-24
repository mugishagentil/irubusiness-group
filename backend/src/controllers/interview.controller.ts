// src/controllers/interviewApplication.controller.ts
import { Request, Response } from "express";
import { InterviewApplicationService } from "../services/interview.service";

export class InterviewApplicationController {
  // Create
  static async create(req: Request, res: Response) {
    try {
      const files = req.files as any;

      console.log("Received files:", files); // Debug log
      console.log("Received body:", req.body); // Debug log

      const data = {
        ...req.body,

        // Convert CSV/strings into arrays if needed
        channels: Array.isArray(req.body.channels)
          ? req.body.channels
          : req.body.channels
          ? [req.body.channels]
          : [],
        contentTypes: Array.isArray(req.body.contentTypes)
          ? req.body.contentTypes
          : req.body.contentTypes
          ? [req.body.contentTypes]
          : [],

        // Files from multer - use correct field names
        portraitUrl: files?.portraitUrl?.[0]?.path.replace(/\\/g, "/") || null,
        signatureUrl:files?.signatureUrl?.[0]?.path.replace(/\\/g, "/") || null,
        uploadDocsUrls: files?.uploadDocsUrls? files.uploadDocsUrls.map((f: Express.Multer.File) =>f.path.replace(/\\/g, "/")
            )
          : [],
      };

      // Convert string booleans to actual booleans
      data.consentPublish =
        data.consentPublish === "true" || data.consentPublish === true;
      data.consentRules =
        data.consentRules === "true" || data.consentRules === true;
      data.consentContact =
        data.consentContact === "true" || data.consentContact === true;

      const result = await InterviewApplicationService.create(data);
      res.status(201).json(result);
    } catch (error: any) {
      console.error("Create error:", error);
      res.status(400).json({ error: error.message });
    }
  }

  // Get all
  static async getAll(req: Request, res: Response) {
    try {
      const applications = await InterviewApplicationService.findAll();
      res.status(200).json(applications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const application = await InterviewApplicationService.findById(id);
      if (!application) return res.status(404).json({ error: "Not found" });
      res.status(200).json(application);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = {
        ...req.body,
        portraitUrl: (req.files as any)?.portraitUrl?.[0],
        signatureUrl: (req.files as any)?.signatureUrl?.[0],
        uploadDocsUrls: (req.files as any)?.uploadDocsUrls || [],
      };

      const updated = await InterviewApplicationService.update(id, data);
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await InterviewApplicationService.delete(id);
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
