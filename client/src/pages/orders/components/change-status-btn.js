import React from "react";
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";
import WithCenteredLoader from "components/loader/with-centered-loader";
import { orderStatusTranslated, orderStatus } from "constants/order-status";
import { useApiCall } from "hooks/use-api-call";
import { changeOrderStatusApi } from "../redux/change-order-status.api";
import { useDispatch } from "react-redux";
import { changeOrderAll } from "../redux/all-orders-slice";

const useStyles = makeStyles(({ palette }) => ({
  btnWrapper: {
    marginRight: "1rem",
  },
  btnProcessing: {
    backgroundColor: palette.info.dark,
    color: palette.info.contrastText,
  },
  btnCompleted: {
    backgroundColor: palette.success.dark,
    color: palette.info.contrastText,
  },
}));

const ChangeStatusBtn = ({ order }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { trigger, loading } = useApiCall({
    fetcher: changeOrderStatusApi,
    onSuccess: (id, statusObj) =>
      dispatch(changeOrderAll({ id, updatedOrder: statusObj })),
  });

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleStatusChange = (status) => (e) => {
    handleClose(e);
    trigger(order.id, { status });
  };
  return (
    <>
      <WithCenteredLoader loading={loading} wrapperClass={classes.btnWrapper}>
        <Button
          size="small"
          variant="contained"
          onClick={handleClick}
          disabled={loading}
        >
          Изменить статус
        </Button>
      </WithCenteredLoader>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.values(orderStatus).map((status) =>
          status === order.status ? null : (
            <MenuItem key={status} onClick={handleStatusChange(status)}>
              {orderStatusTranslated[status]}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
};

export default ChangeStatusBtn;
