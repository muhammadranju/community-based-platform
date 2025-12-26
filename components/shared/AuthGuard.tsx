// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect } from "react";
// import UserInfo from "./UserInfo";
// import getToken from "./getToken";

// // Define role-based route access configuration
// const ROUTE_PERMISSIONS = {
//   // Admin and Super Admin routes
//   ADMIN: [
//     "/dashboard/overview",
//     "/dashboard/posts",
//     "/dashboard/users",
//     "/dashboard/moderations",
//     "/dashboard/waiting-list",
//     "/dashboard/profile",
//   ],

//   // User routes
//   USER: [
//     "/dashboard/users/overview",
//     "/dashboard/my-upload",
//     "/dashboard/upload-content",
//     "/dashboard/profile",
//     "/dashboard/settings",
//   ],
// };

// // Default redirect paths based on role
// const DEFAULT_REDIRECTS = {
//   ADMIN: "/dashboard/overview",
//   SUPER_ADMIN: "/dashboard/overview",
//   USER: "/dashboard/users/overview",
//   UNAUTHENTICATED: "/login",
// };

// interface AuthGuardProps {
//   children: React.ReactNode;
// }

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const token = getToken();
//   const user = UserInfo();

//   useEffect(() => {
//     // Check if user is authenticated
//     if (!token || !user) {
//       router.push(DEFAULT_REDIRECTS.UNAUTHENTICATED);
//       return;
//     }

//     const userRole = user.role as keyof typeof DEFAULT_REDIRECTS;

//     // Check if user has access to the current route
//     const hasAccess = checkRouteAccess(pathname, userRole);

//     if (!hasAccess) {
//       // Redirect to appropriate dashboard based on role
//       const redirectPath =
//         DEFAULT_REDIRECTS[userRole] || DEFAULT_REDIRECTS.UNAUTHENTICATED;
//       router.push(redirectPath);
//     }
//   }, [pathname, token, user, router]);

//   // Function to check if user has access to a route
//   const checkRouteAccess = (route: string, role: string): boolean => {
//     // Allow SUPER_ADMIN to access all routes
//     if (role === "SUPER_ADMIN") {
//       return true;
//     }

//     // Check for ADMIN routes
//     if (role === "ADMIN") {
//       const adminRoutes = ROUTE_PERMISSIONS.ADMIN;
//       return adminRoutes.some((allowedRoute) => route.startsWith(allowedRoute));
//     }

//     // Check for USER routes
//     if (role === "USER") {
//       const userRoutes = ROUTE_PERMISSIONS.USER;
//       return userRoutes.some((allowedRoute) => route.startsWith(allowedRoute));
//     }

//     return false;
//   };

//   // Only render children if user is authenticated
//   if (!token || !user) {
//     return null;
//   }

//   return <>{children}</>;
// }

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "./useUser"; // adjust path
import getToken from "./getToken";

const ROUTE_PERMISSIONS = {
  ADMIN: [
    "/dashboard/overview",
    "/dashboard/posts",
    "/dashboard/users",
    "/dashboard/moderations",
    "/dashboard/waiting-list",
    "/dashboard/profile",
  ],
  USER: [
    "/dashboard/users/overview",
    "/dashboard/my-upload",
    "/dashboard/upload-content",
    "/dashboard/profile",
    "/dashboard/settings",
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

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = getToken();
  const user = useUser(); // Now safe – only reads localStorage in useEffect

  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client before doing redirects
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Prevent running on server

    if (!token || !user) {
      router.push(DEFAULT_REDIRECTS.UNAUTHENTICATED);
      return;
    }

    const userRole = user.role as keyof typeof DEFAULT_REDIRECTS;

    if (userRole === "SUPER_ADMIN") {
      return; // Allow all routes
    }

    const hasAccess = checkRouteAccess(pathname, userRole);

    if (!hasAccess) {
      const redirectPath =
        DEFAULT_REDIRECTS[userRole] || DEFAULT_REDIRECTS.UNAUTHENTICATED;
      router.push(redirectPath);
    }
  }, [pathname, token, user, router, isClient]);

  const checkRouteAccess = (route: string, role: string): boolean => {
    if (role === "SUPER_ADMIN") return true;

    const allowedRoutes =
      ROUTE_PERMISSIONS[role as keyof typeof ROUTE_PERMISSIONS];
    if (!allowedRoutes) return false;

    return allowedRoutes.some((allowedRoute) => route.startsWith(allowedRoute));
  };

  // Show nothing or a loader while checking auth on client
  if (!isClient || !token || !user) {
    return null; // or <LoadingSpinner />
  }

  return <>{children}</>;
}
