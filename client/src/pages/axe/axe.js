import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsBySlug, getCommentsBySlug } from "./redux/commentsSlice";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@material-ui/core";
import moment from "moment";

const Axe = ({
  match: {
    params: { slug },
  },
}) => {
  const dispatch = useDispatch();
  const comments = useSelector(getCommentsBySlug);

  useEffect(() => {
    dispatch(fetchCommentsBySlug(slug));
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <Box key={comment.id} mb={2}>
          <Card elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {comment.author.name}
              </Typography>
              <Typography gutterBottom variant="caption">
                Дата: {moment(comment.createdAt).fromNow()}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                gutterBottom
              >
                {comment.message}
              </Typography>
              <Typography
                variant="subtitle1"
                color={comment.status === "pending" ? "error" : "primary"}
              >
                Статус: {comment.status === "pending" ? "Ожидает" : "Одобрен"}
              </Typography>
            </CardContent>
            <CardActions>
              {comment.status === "pending" && (
                <Button size="small" variant="contained" color="primary">
                  Одобрить
                </Button>
              )}
              <Button size="small" variant="outlined" color="secondary">
                Удалить
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  );
};

export default Axe;

// author: {name: "maksym dukov"}
// createdAt: "2020-06-03T15:32:44.625Z"
// id: "5ed7c29c8c76c05965a134f3"
// message: "testmessage"
// slug: "sokira-pokhidna-turistichna-z-keltskim-vizerunkom-sonce"
// status: "approved"
// updatedAt: "2020-06-03T16:16:27.291Z"
