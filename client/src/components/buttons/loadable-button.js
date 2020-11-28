import React from "react";
import { useApiCall } from "hooks/use-api-call";
import WithCenteredLoader from "components/loader/with-centered-loader";
import { Button } from "@material-ui/core";

const LoadableButton = ({
  disabled,
  fetcher,
  onSuccess,
  onFail,
  onClick,
  setError,
  ...rest
}) => {
  const { trigger, loading } = useApiCall({
    fetcher,
    onSuccess,
    onFail,
    setError
  });
  const onClickHandler = (e) => {
    if (onClick && !onClick(e)) {
      return;
    }
    trigger();
  };
  return (
    <WithCenteredLoader loading={loading}>
      <Button
        disabled={disabled || loading}
        onClick={onClickHandler}
        size="small"
        variant="contained"
        color="primary"
        {...rest}
      />
    </WithCenteredLoader>
  );
};

export default LoadableButton;
