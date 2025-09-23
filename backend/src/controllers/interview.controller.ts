// src/controllers/interviewApplication.controller.ts
import { Request, Response } from "express";
import { InterviewApplicationService } from "../services/interview.service";
import { createInterviewApplicationSchema } from "../types/other.dto";

export class InterviewApplicationController {
  // Create
  static async create(req: Request, res: Response) {
    try {
     
      const result = await InterviewApplicationService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
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
      const data = req.body;
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
