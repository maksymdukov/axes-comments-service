import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Grid,
} from "@material-ui/core";
import StatusButton from "components/buttons/comment-status";
import DeleteCommentButton from "components/buttons/delete-comment";
import clsx from "clsx";
import moment from "moment";

const useStyles = makeStyles(({ palette }) => ({
  statusApproved: {
    color: palette.success.main,
  },
  statusPending: {
    color: palette.error.main,
  },
  commentLabel: {
    fontSize: "1rem",
    fontWeight: "500",
  },
}));

const CommentCard = ({
  comment,
  renderAxeInfo,
  onApproveSuccess,
  onSuspendSuccess,
  onDeleteSuccess,
}) => {
  const classes = useStyles();

  return (
    <Box key={comment.id} mb={2}>
      <Card elevation={3}>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                {comment.author.name}
              </Typography>
              <Typography gutterBottom variant="caption">
                Дата: {moment(comment.createdAt).fromNow()}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                component="div"
                gutterBottom
              >
                <div className={classes.commentLabel}>Комментарий:</div>
                {comment.message}
              </Typography>
              <Typography
                variant="subtitle1"
                className={clsx(
                  comment.status === "pending" && classes.statusPending,
                  comment.status === "approved" && classes.statusApproved
                )}
              >
                Статус: {comment.status === "pending" ? "Ожидает" : "Одобрен"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {renderAxeInfo && renderAxeInfo(comment)}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {comment.status === "pending" && (
            <StatusButton
              commentIds={comment.id}
              status="approved"
              onSuccess={onApproveSuccess}
            >
              Одобрить
            </StatusButton>
          )}
          {comment.status === "approved" && (
            <StatusButton
              commentIds={comment.id}
              status="pending"
              color="default"
              variant="outlined"
              onSuccess={onSuspendSuccess}
            >
              Заморозить
            </StatusButton>
          )}
          <DeleteCommentButton
            commentIds={comment.id}
            onSuccess={onDeleteSuccess}
          >
            Удалить
          </DeleteCommentButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CommentCard;
