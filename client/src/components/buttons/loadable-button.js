import React from "react";
import { useApiCall } from "hooks/use-api-call";
import WithCenteredLoader from "components/loader/with-centered-loader";
import { Button } from "@material-ui/core";

const LoadableButton = ({ fetcher, onSuccess, onFail, onClick, ...rest }) => {
  const { trigger, loading } = useApiCall({
    fetcher,
    onSuccess,
    onFail,
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
        disabled={loading}
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
