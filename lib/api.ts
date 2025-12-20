import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  success: boolean;
};

// Fixed: Properly handle async cookies()
async function getAuthToken(): Promise<string | null> {
  // Server-side: safely read from cookies (HTTP-only)
  if (typeof window === "undefined") {
    try {
      const cookieStore = await cookies(); // ← Must await!
      const token =
        cookieStore.get("auth_token")?.value ||
        cookieStore.get("token")?.value ||
        cookieStore.get("access_token")?.value; // add common names if needed

      return token ?? null;
    } catch {
      return null; // In case cookies() fails (e.g., outside request context)
    }
  }

  // Client-side fallback: localStorage
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("access_token")
    : null;
}

async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = await getAuthToken(); // ← Now await the token

  const headers = new Headers(options.headers || {});

  if (
    !headers.has("Content-Type") &&
    options.body &&
    typeof options.body === "object"
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Important for sending cookies
      // Next.js App Router: cache control if needed
      // cache: 'no-store', // or 'force-cache' depending on needs
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: errorText || response.statusText || "Request failed",
      };
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return { success: true, data };
    }

    const text = await response.text();
    return { success: true, data: text as any };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error",
    };
  }
}

export default apiFetch;
