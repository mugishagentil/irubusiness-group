// src/controllers/partnershipApplication.controller.ts
import { Request, Response } from "express";
import { PartnershipApplicationService } from "../services/partner.service";
import { createPartnershipApplicationSchema } from "../types/other.dto";

export class PartnershipApplicationController {
  static async create(req: Request, res: Response) {
    try {
     const files = req.files as any;
      const data = {
        ...req.body,
        docs: files?.docs? files.docs.map((f: Express.Multer.File) =>f.path.replace(/\\/g, "/")
            )
          : [],
      };

      const validatedData = createPartnershipApplicationSchema.parse(data);
      const result = await PartnershipApplicationService.create(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    const results = await PartnershipApplicationService.findAll();
    res.json(results);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PartnershipApplicationService.findById(id);
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result);
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const updatedApp = await PartnershipApplicationService.updateStatus(id, status);
      res.status(200).json(updatedApp);
    } catch (error: any) {
      console.error("Update status error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await PartnershipApplicationService.delete(id);
    res.status(204).send();
  }
}
