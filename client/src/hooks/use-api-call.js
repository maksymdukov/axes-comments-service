import { useState, useCallback } from "react";

export const useApiCall = ({ fetcher, args, onSuccess, onFail }) => {
  const [{ data, loading, error }, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const trigger = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const resp = await fetcher(args);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: null,
        data: resp.data,
      }));
      onSuccess && onSuccess();
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error,
        data: null,
      }));
      onFail && onFail(error);
    }
  }, [fetcher, onSuccess, onFail]);

  return { data, loading, error, trigger };
};
