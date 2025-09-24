import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function apiFetch(url: string, options: RequestInit = {}): Promise<any> {
  const token = JSON.parse(localStorage.getItem("adminAuth") || "{}")?.token;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5020/api";

  const isFormData = options.body instanceof FormData;

  const headers: any = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // Only set JSON content type if not FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API Error");
  }

  return response.json();
}
