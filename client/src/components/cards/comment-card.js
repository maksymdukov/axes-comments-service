import React, { useMemo } from "react";
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
  },
  bold: {
    fontWeight: "500",
  },
}));

const splitNewLines = (text) => text.split(/\r\n|\r|\n/g);

const CommentCard = ({
  comment,
  renderAxeInfo,
  onApproveSuccess,
  onSuspendSuccess,
  onDeleteSuccess,
}) => {
  const classes = useStyles();

  const message = useMemo(
    () =>
      splitNewLines(comment.message).map((line, idx) => (
        <React.Fragment key={idx}>
          {line} <br />
        </React.Fragment>
      )),
    [comment.message]
  );
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
                <span className={classes.bold}>Дата</span>:{" "}
                {moment(comment.createdAt).fromNow()}
              </Typography>
              {comment.rating && (
                <div>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    className={clsx(classes.bold)}
                  >
                    Оценка: {`  `}
                  </Typography>
                  {comment.rating}
                </div>
              )}
              <Typography
                variant="body2"
                color="textPrimary"
                component="div"
                gutterBottom
              >
                <div className={clsx(classes.commentLabel, classes.bold)}>
                  Комментарий:
                </div>
                {message}
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
