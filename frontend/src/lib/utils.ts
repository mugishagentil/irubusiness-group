import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const savedAuth = JSON.parse(localStorage.getItem("adminAuth") || "{}");
  const token = savedAuth?.accessToken;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5020/api";

  const isFormData = options.body instanceof FormData;

  const headers: any = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    // Handle expired token / unauthorized
    if (response.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem("adminAuth");
      window.location.href = "/admin"; // redirect to login
      throw new Error("Session expired. Redirecting to login...");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API Error");
    }

    return response.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}
