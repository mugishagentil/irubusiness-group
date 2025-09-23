import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  static async create(req: Request, res: Response) {
    try {
      const project = await ProjectService.create(req.body);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const projects = await ProjectService.findAll();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const project = await ProjectService.findById(req.params.id);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const project = await ProjectService.update(req.params.id, req.body);
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ProjectService.delete(req.params.id);
      res.json({ message: "Project deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
