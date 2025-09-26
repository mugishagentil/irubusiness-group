// src/controllers/contact.controller.ts
import { Request, Response } from "express";
import { ContactService } from "../services/contacirug.service";

export class ContactController {
  static async create(req: Request, res: Response) {
    try {
      const contact = await ContactService.create(req.body);
      return res.status(201).json(contact);
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to submit contact message",
        error: error.message,
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const messages = await ContactService.findAll();
      return res.status(200).json(messages);
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to retrieve messages",
        error: error.message,
      });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const message = await ContactService.findById(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      return res.status(200).json(message);
    } catch (error: any) {
      return res.status(500).json({
        message: "Failed to retrieve message",
        error: error.message,
      });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const updatedApp = await ContactService.updateStatus(id, status);
      res.status(200).json(updatedApp);
    } catch (error: any) {
      console.error("Update status error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await ContactService.delete(id);
    res.status(204).send();
  }
}
