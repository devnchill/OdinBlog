import { useEffect, useState } from "react";
import type { IBlogResponse } from "../types/blog.types";

export const useBlogs = () => {
  const [data, setData] = useState<IBlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/blog/all");
        const json = await res.json();

        if (!json.success) {
          setError(json.message || "Failed to load blogs");
          return;
        }

        setData(json);
      } catch (err) {
        console.log(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading, error };
};
