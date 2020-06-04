import React, { useMemo } from "react";
import { Button, CircularProgress, Box, makeStyles } from "@material-ui/core";
import { useApiCall } from "hooks/use-api-call";
import { approveCommentsApi } from "pages/axe/redux/approveComments.api";

const useStyles = makeStyles({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& > *": {
      verticalAlign: "middle",
    },
  },
});

const StatusButton = ({
  commentIds,
  status = "approved",
  onSuccess,
  onFail,
  ...rest
}) => {
  const classes = useStyles();
  const commentIdsMemo = useMemo(() => {
    if (!Array.isArray(commentIds)) {
      return [commentIds];
    }
    return commentIds;
  }, [commentIds]);
  const args = useMemo(() => ({ status, comments: commentIdsMemo }), [
    commentIds,
    status,
  ]);
  const { trigger, loading } = useApiCall({
    fetcher: approveCommentsApi,
    args,
    onSuccess,
    onFail,
  });
  return (
    <Box display="inline-block" position="relative">
      <Button
        disabled={loading}
        onClick={trigger}
        size="small"
        variant="contained"
        color="primary"
        {...rest}
      />
      {loading && (
        <div className={classes.loader}>
          <CircularProgress size={25} />
        </div>
      )}
    </Box>
  );
};

export default StatusButton;
