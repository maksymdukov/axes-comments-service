import React, { useMemo } from "react";
import { Button, CircularProgress, Box, makeStyles } from "@material-ui/core";
import { useApiCall } from "hooks/use-api-call";
import { deleteCommentsApi } from "pages/axe/redux/deleteComments.api";

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

const DeleteCommentButton = ({ commentIds, onSuccess, onFail, ...rest }) => {
  const classes = useStyles();
  const fetcherArgs = useMemo(() => {
    if (!Array.isArray(commentIds)) {
      return { comments: [commentIds] };
    }
    return { comments: commentIds };
  }, [commentIds]);
  const { trigger, loading } = useApiCall({
    fetcher: deleteCommentsApi,
    args: fetcherArgs,
    onSuccess,
    onFail,
  });
  return (
    <Box display="inline-block" position="relative">
      <Button
        disabled={loading}
        onClick={trigger}
        size="small"
        variant="outlined"
        color="secondary"
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

export default DeleteCommentButton;
