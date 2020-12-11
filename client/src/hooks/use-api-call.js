import { useState, useCallback } from "react";

export const useApiCall = ({
  fetcher,
  onSuccess,
  onFail,
  setError,
  initData,
}) => {
  const [{ data, loading, error }, setState] = useState({
    data: initData || null,
    loading: false,
    error: null,
  });

  const trigger = useCallback(
    async (...args) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true, error: null }));

        const resp = await fetcher(...args);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: null,
          data: resp && resp.data,
        }));
        onSuccess && onSuccess(resp);
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: error,
          data: null,
        }));
        if (error && error.message === "canceled") {
          return;
        }
        setError
          ? setError(
              (error &&
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                "Что-то пошло не так"
            )
          : onFail && onFail(error);
      }
    },
    [fetcher, onSuccess, onFail]
  );

  return { data, loading, error, trigger };
};
