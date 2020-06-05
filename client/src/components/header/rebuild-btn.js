import React from "react";
import { useApiCall } from "hooks/use-api-call";
import { rebuildFrontendApi } from "./rebuild.api";
import WithCenteredLoader from "components/loader/with-centered-loader";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  rebuild: {
    backgroundColor: palette.warning.main,
    color: palette.common.white,
  },
  btn: {
    marginLeft: "auto",
  },
}));

const RebuildBtn = () => {
  const classes = useStyles();
  const { trigger, loading, data } = useApiCall({
    fetcher: rebuildFrontendApi,
  });
  console.log("data", data);

  return (
    <WithCenteredLoader loading={loading} wrapperClass={classes.btn}>
      <Button className={classes.rebuild} onClick={trigger} disabled={loading}>
        Опубликовать
      </Button>
    </WithCenteredLoader>
  );
};

export default RebuildBtn;
