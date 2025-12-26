"use client";

import { useEffect, useRef } from "react";
import { authFetch } from "@/lib/authFetch";
import useUser from "./useUser";
import getToken from "./getToken";

export default function ActiveUserTracker() {
  const user = useUser();
  const token = getToken();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track if user is logged in
    if (!user || !token) return;

    // Check if we've already tracked this session to avoid spamming the API
    // We'll use sessionStorage so it clears when the tab is closed
    const sessionTracked = sessionStorage.getItem("active_user_tracked");
    if (sessionTracked) return;

    const trackUser = async () => {
      if (hasTracked.current) return;

      try {
        // Gather device info (basic client-side detection)
        const userAgent = navigator.userAgent;
        let os = "Unknown OS";
        if (userAgent.indexOf("Win") !== -1) os = "Windows";
        if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
        if (userAgent.indexOf("X11") !== -1) os = "UNIX";
        if (userAgent.indexOf("Linux") !== -1) os = "Linux";

        let browser = "Unknown Browser";
        if (userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
        else if (userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
        else if (userAgent.indexOf("Safari") !== -1) browser = "Safari";
        else if (userAgent.indexOf("Edge") !== -1) browser = "Edge";

        const device = /Mobi|Android/i.test(userAgent) ? "mobile" : "desktop";

        await authFetch("/user/active-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device,
            browser,
            os,
          }),
          auth: true,
        });

        // Mark as tracked for this session (and this component instance)
        sessionStorage.setItem("active_user_tracked", "true");
        hasTracked.current = true;
      } catch (error) {
        console.error("Failed to track active user:", error);
      }
    };

    trackUser();
  }, [user, token]);

  return null;
}
