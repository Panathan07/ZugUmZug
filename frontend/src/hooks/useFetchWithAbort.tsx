import { useEffect, useState } from "react";

export const useFetchWithAbort = (url, config = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let controller = new AbortController();
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
        if (error.name === "AbortError") {
          console.log(error.message);
          setError(error);
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

  return [data, isLoading, error];
};
