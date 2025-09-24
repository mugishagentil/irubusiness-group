// src/services/projects.ts
import { apiFetch } from "@/lib/utils";

// Enum mapping helpers
const mapStatus = (status: string) => {
  switch (status) {
    case "Planning": return "planning";
    case "Active": return "active";
    case "Completed": return "completed";
    case "On hold": return "onHold"; // map UI "on-hold" -> backend "onHold"
    default: return "planning";
  }
};

const mapPriority = (priority: string) => {
  switch (priority) {
    case "Low": return "low";
    case "Medium": return "medium";
    case "High": return "high";
    default: return "medium";
  }
};

const appendDataToForm = (formData: FormData, data: any) => {
  Object.keys(data).forEach((key) => {
    if (key === "image") return;
    let value: any = data[key];

    if (value !== undefined && value !== null && value !== "") {
      // Convert numbers
      if (key === "budget" || key === "progress") {
        value = Number(value);
      }
      // Map enums
      if (key === "status") value = mapStatus(value);
      if (key === "priority") value = mapPriority(value);

      formData.append(key, value);
    }
  });
};

export const ProjectsAPI = {
  create: (data: any) => {
    const formData = new FormData();

    // Handle file
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    appendDataToForm(formData, data);

    return apiFetch("/projects", {
      method: "POST",
      body: formData,
    });
  },

  update: (id: string, data: any) => {
    const formData = new FormData();

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    appendDataToForm(formData, data);

    return apiFetch(`/projects/${id}`, {
      method: "PUT",
      body: formData,
    });
  },

  getAll: () => apiFetch("/projects"),
  getById: (id: string) => apiFetch(`/projects/${id}`),
  delete: (id: string) =>
    apiFetch(`/projects/${id}`, { method: "DELETE" }),
};
