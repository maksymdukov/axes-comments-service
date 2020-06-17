import React, { useMemo } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import GroupItem from "./group-item";
import OrderCard from "./order-card";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { orderStatus, orderStatusTranslated } from "constants/order-status";
import LoadableButton from "components/buttons/loadable-button";
import { deleteOrderApi } from "../redux/delete-order.api";
import ChangeStatusBtn from "./change-status-btn";
import { fetchAllOrders } from "../redux/all-orders-slice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(({ palette }) => ({
  panel: {
    marginBottom: "1rem",
  },
  panelProcessing: {
    backgroundColor: palette.info.dark,
    color: palette.info.contrastText,
  },
  panelCompleted: {
    backgroundColor: palette.grey[500],
    color: palette.info.contrastText,
  },
  panelNew: {
    backgroundColor: palette.success.main,
    color: palette.info.contrastText,
  },
}));

const ExpansionItem = ({ order }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalSum = useMemo(
    () =>
      order.items.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.count,
        0
      ),
    [order]
  );

  const onDeleteClick = (e) => {
    e.stopPropagation();
    const sure = window.confirm("Точно хотите удалить?");
    return sure;
  };
  return (
    <ExpansionPanel
      className={clsx({
        [classes.panel]: true,
        [classes.panelProcessing]: order.status === orderStatus.PROCESSING,
        [classes.panelNew]: order.status === orderStatus.NEW,
        [classes.panelCompleted]: order.status === orderStatus.COMPLETED,
      })}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <GroupItem label="Дата">
            {new Date(order.createdAt).toLocaleString()}
          </GroupItem>
          <GroupItem label="Статус">
            {orderStatusTranslated[order.status]}
          </GroupItem>
          <GroupItem label="Сумма" boxProps={{ mb: 2 }}>
            {totalSum} грн
          </GroupItem>
          {/* <Box display="inline-block" mr={2}>
            <Button variant="contained" disabled={true}>
              Изменить заказ
            </Button>
          </Box> */}
          <ChangeStatusBtn order={order} />
          <LoadableButton
            onClick={onDeleteClick}
            fetcher={() => deleteOrderApi(order.id)}
            onSuccess={() => dispatch(fetchAllOrders())}
            color="secondary"
            variant="contained"
          >
            Удалить
          </LoadableButton>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <OrderCard order={order} totalSum={totalSum} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionItem;
