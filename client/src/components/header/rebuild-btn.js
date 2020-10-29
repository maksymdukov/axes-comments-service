import React, { useState } from "react";
import { useApiCall } from "hooks/use-api-call";
import { rebuildFrontendApi } from "./rebuild.api";
import WithCenteredLoader from "components/loader/with-centered-loader";
import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(({ palette }) => ({
  rebuild: {
    backgroundColor: palette.warning.main,
    color: palette.common.white,
  },
  btn: {
    marginLeft: "auto",
  },
  rebuildSuccess: {
    backgroundColor: palette.success.main,
  },
}));

const RebuildBtn = () => {
  const classes = useStyles();
  const [published, setPublished] = useState(false);
  const { trigger, loading, data } = useApiCall({
    fetcher: rebuildFrontendApi,
    onSuccess: () => {
      setPublished(true);
    },
  });
  console.log("data", data);

  return (
    <WithCenteredLoader loading={loading} wrapperClass={classes.btn}>
      <Button
        className={clsx(classes.rebuild, published && classes.rebuildSuccess)}
        onClick={trigger}
        disabled={loading || published}
        title="Перестроить весь сайт"
      >
        {published ? "Публикуется... ожидайте" : "Опубликовать"}
      </Button>
    </WithCenteredLoader>
  );
};

export default RebuildBtn;
