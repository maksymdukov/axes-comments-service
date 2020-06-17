import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAxes,
  getAxes,
  updateAxesPagination,
  getAxesLoading,
  getAxesPagination,
} from "./redux/axesSlice";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TableFooter,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TablePaginator from "components/pagination/table-pagination";
import MainHeader from "components/typography/main-header";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
});

const Axes = () => {
  const classes = useStyles();
  const axes = useSelector(getAxes);
  const history = useHistory();
  const dispatch = useDispatch();
  const { size, page } = useSelector(getAxesPagination);
  const loading = useSelector(getAxesLoading);
  useEffect(() => {
    dispatch(fetchAxes());
  }, [page, size, dispatch]);

  const handleRowClick = (axe) => () => {
    history.push(`/axe/${axe.slug}`);
  };
  return (
    <div>
      <MainHeader>Топоры:</MainHeader>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Картинка",
              "Заголовок",
              "Ожидающие комментарии",
              "Одобренные Комментарии",
            ].map((name) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {axes.map((axe) => (
            <TableRow
              className={classes.row}
              key={axe.id}
              hover
              onClick={handleRowClick(axe)}
            >
              <TableCell>
                {axe.image && (
                  <img
                    src={axe.image.url}
                    alt={axe.title}
                    style={{ width: 100, height: "auto" }}
                  />
                )}
              </TableCell>
              <TableCell>{axe.title}</TableCell>
              <TableCell>{axe.pendingCount}</TableCell>
              <TableCell>{axe.approvedCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginator
              getPaginationState={getAxesPagination}
              colSpan={4}
              updatePagination={updateAxesPagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Axes;
