import Cookies from "js-cookie";

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function authFetch(endpoint: string, options: FetchOptions = {}) {
  const { auth = true, headers, ...restOptions } = options;

  let token: string | undefined;

  if (auth) {
    token = Cookies.get("token");

    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("token") ?? undefined;
    }
  }

  // ✅ Explicitly typed headers object
  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string>),
  };

  if (!(restOptions.body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
  }

  // ✅ Safe assignment
  if (auth && token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
    {
      ...restOptions,
      headers: finalHeaders,
    }
  );

  return response;
}
