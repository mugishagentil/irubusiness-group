// src/controllers/partnershipApplication.controller.ts
import { Request, Response } from "express";
import { PartnershipApplicationService } from "../services/partner.service";
import { createPartnershipApplicationSchema } from "../types/other.dto";

export class PartnershipApplicationController {
  static async create(req: Request, res: Response) {
    try {
      const validatedData = createPartnershipApplicationSchema.parse(req.body);
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

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await PartnershipApplicationService.update(id, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await PartnershipApplicationService.delete(id);
    res.status(204).send();
  }
}
