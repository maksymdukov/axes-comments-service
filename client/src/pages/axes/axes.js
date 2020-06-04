import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAxes,
  getAxes,
  getAxesPage,
  getAxesSize,
  getAxesTotal,
  updateAxesPagination,
} from "./redux/axesSlice";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TableFooter,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import TablePaginator from "components/pagination/table-pagination";

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
  const page = useSelector(getAxesPage);
  const size = useSelector(getAxesSize);
  useEffect(() => {
    dispatch(fetchAxes());
  }, [page, size]);

  const handleRowClick = (axe) => () => {
    history.push(`/axe/${axe.slug}`);
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Slug",
              "Заголовок",
              "Ожидающие комментарии",
              "Одобренные Комментарии",
            ].map((name) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
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
              getPage={getAxesPage}
              getSize={getAxesSize}
              getTotal={getAxesTotal}
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
