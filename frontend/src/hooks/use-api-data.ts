import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

const useApiData = <T,>(endpoint: string) => {
  const [result, setResult] = useState<{
    endpoint: string;
    data: T | null;
    error: string | null;
  }>({ endpoint: "", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    apiGet<T>(endpoint, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({ endpoint, data, error: null });
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setResult({
            endpoint,
            data: null,
            error:
              requestError instanceof Error
                ? requestError.message
                : "Đã xảy ra lỗi khi tải dữ liệu.",
          });
        }
      });

    return () => controller.abort();
  }, [endpoint]);

  const isCurrentRequest = result.endpoint === endpoint;
  return {
    data: isCurrentRequest ? result.data : null,
    error: isCurrentRequest ? result.error : null,
    isLoading: !isCurrentRequest,
  };
};

export default useApiData;
