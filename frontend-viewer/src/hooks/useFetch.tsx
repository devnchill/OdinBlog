import { useState, useEffect } from "react";

interface IFetchState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

const useFetch = <T = unknown,>(
  url: string,
  opts?: RequestInit,
): IFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetch(url, { ...opts, signal: controller.signal })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        const isJson = contentType?.includes("application/json");

        const json = isJson ? await res.json().catch(() => ({})) : {};

        if (!res.ok) {
          const msg =
            json.message ||
            `HTTP ${res.status}: ${res.statusText || "Unknown error"}`;
          throw new Error(msg);
        }

        if (json.success === false) {
          throw new Error(json.message || "Request failed");
        }

        return json as T;
      })
      .then(setData)
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message || "Unknown error");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url, opts]);

  return { data, error, isLoading };
};

export default useFetch;
