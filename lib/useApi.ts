"use client";

import { useState, useEffect } from "react";
import apiFetch from "./api";

export function useApi<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch<T>(endpoint, options);
      if (res.success) {
        setData(res.data ?? null);
      } else {
        setError(res.error || "Failed");
      }
      setLoading(false);
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: () => window.location.reload() }; // or implement proper refetch
}
