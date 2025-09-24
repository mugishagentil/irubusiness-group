// src/services/contact.ts
import { apiFetch } from "@/lib/utils";

export const ContactAPI = {
  create: (data: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  getAll: () => apiFetch("/contact"), // Admin only

  getById: (id: string) => apiFetch(`/contact/${id}`), // Admin only

  updateStatus: (id: string, status: string) => apiFetch(`/contact/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  }),

  delete: (id: string) => apiFetch(`/contact/${id}`, { method: "DELETE" }),
};
