"use client";

import { useState, useEffect } from "react";

export type User = {
  role: string;
  // add other user fields as needed
};

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    }
  }, []);

  return user;
}
