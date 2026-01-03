"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import getToken from "./getToken";
import { authFetch } from "@/lib/authFetch";
import Cookies from "js-cookie";

const ROUTE_PERMISSIONS = {
  ADMIN: [
    "/dashboard/overview",
    "/dashboard/posts",
    "/dashboard/users",
    "/dashboard/moderations",
    "/dashboard/waiting-list",
    "/dashboard/profile",
    "/dashboard/news-letter",
    "/dashboard/settings",
  ],
  USER: [
    "/dashboard/users/overview",
    "/dashboard/my-upload",
    "/dashboard/upload-content",
    "/dashboard/upload-forum",
    "/dashboard/profile",
    "/dashboard/settings",
    "/dashboard/my-forums",
  ],
};

const DEFAULT_REDIRECTS = {
  ADMIN: "/dashboard/overview",
  SUPER_ADMIN: "/dashboard/overview",
  USER: "/dashboard/users/overview",
  UNAUTHENTICATED: "/login",
};

interface AuthGuardProps {
  children: React.ReactNode;
}
type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  const token = getToken();

  const clearAuthDataAndRedirect = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }

    Cookies.remove("token");
    Cookies.remove("refreshToken");

    router.replace(DEFAULT_REDIRECTS.UNAUTHENTICATED);
  };

  const verifyToken = async () => {
    try {
      if (!token) {
        clearAuthDataAndRedirect();
        return;
      }

      const res = await authFetch("/user/profile", {
        method: "GET",
        auth: true,
      });

      if (!res.ok) {
        clearAuthDataAndRedirect();
        return;
      }

      const result = await res.json();
      const userData = result?.data;

      // ❌ Invalid role
      if (
        !userData ||
        !["ADMIN", "SUPER_ADMIN", "USER"].includes(userData.role)
      ) {
        clearAuthDataAndRedirect();
        return;
      }

      setUser(userData);
      setIsClient(true);
    } catch {
      clearAuthDataAndRedirect();
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (!isClient || !user) return;

    const role: UserRole = user.role;

    // SUPER_ADMIN → allow everything
    if (role === "SUPER_ADMIN") return;

    const allowedRoutes =
      ROUTE_PERMISSIONS[role as keyof typeof ROUTE_PERMISSIONS];
    const hasAccess = allowedRoutes?.some((route) =>
      pathname.startsWith(route)
    );

    if (!hasAccess) {
      router.replace(
        DEFAULT_REDIRECTS[role] || DEFAULT_REDIRECTS.UNAUTHENTICATED
      );
    }
  }, [pathname, user, isClient, router]);

  // ⏳ Block render until auth is resolved
  if (!isClient || !user) {
    return null; // or loader
  }

  return <>{children}</>;
}
