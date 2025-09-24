  import { Request, Response } from "express";
  import { ProjectService } from "../services/project.service";

  export class ProjectController {
    static async create(req: Request, res: Response) {
      try {
        const files = req.files as any;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const data = {
          ...req.body,
           image: files?.image?.[0] ? `${baseUrl}/${files.image[0].path.replace(/\\/g, "/")}` : null,
          budget: req.body.budget ? Number(req.body.budget) : null,
          progress: req.body.progress ? Number(req.body.progress) : 0,
          startDate: req.body.startDate ? new Date(req.body.startDate) : null,
          endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        };
        const project = await ProjectService.create(data);
        res.status(201).json(project);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }

    static async findAll(req: Request, res: Response) {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const projects = await ProjectService.findAll();
      
      // Add full URL to image paths
      const projectsWithFullUrls = projects.map(project => ({
        ...project,
        image: project.image ? `${baseUrl}/${project.image}` : null
      }));
      
      res.json(projectsWithFullUrls);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

    static async findById(req: Request, res: Response) {
      try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const project = await ProjectService.findById(req.params.id);
      
      // Add full URL to image paths
      if (!project) return res.status(404).json({ message: "Project not found" });
      
      project.image = project.image ? `${baseUrl}/${project.image}` : null;
      res.json(project);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }

    static async update(req: Request, res: Response) {
      try {
        const files = req.files as any;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const data = {
          ...req.body,
          image: files?.image?.[0] ? `${baseUrl}/${files.image[0].path.replace(/\\/g, "/")}` : null,
          budget: req.body.budget ? Number(req.body.budget) : null,
          progress: req.body.progress ? Number(req.body.progress) : 0,
          startDate: req.body.startDate ? new Date(req.body.startDate) : null,
          endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        };
        const project = await ProjectService.update(req.params.id, data);
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
