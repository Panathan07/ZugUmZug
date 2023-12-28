import { useEffect, useState } from "react";

export const useFetchWithAbort = (url: string, config = {}) => {
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setFetchError(error);
          setIsLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [data, isLoading, fetchError];
};
