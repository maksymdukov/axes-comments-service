import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ChangeStatus from "components/menus/change-status";
import { orderStatus } from "../orders.constants";
import { updateOrderStatusApi } from "../apis/change-order-status.api";

const options = [
  { label: "Новый", value: orderStatus.NEW },
  { label: "В обработке", value: orderStatus.PROCESSING },
  { label: "Завершен", value: orderStatus.COMPLETED },
  { label: "Отменен", value: orderStatus.CANCELED },
];

const getCustomSelectBar = ({
  entities,
  onEntityBulkDelete,
  refetchEntities,
}) =>
  function CustomSelectBar({ data }, _, setSelectedRows) {
    const wrapWithReset = (fn) => (...args) => {
      const result = fn({ data }, ...args);
      if (result) setSelectedRows([]);
    };

    const onStatusChanged = async (status) => {
      const promises = data.map(({ dataIndex }) =>
        updateOrderStatusApi(entities[dataIndex].id, { status })
      );
      await Promise.all(promises);
      setSelectedRows([]);
      refetchEntities();
    };

    return (
      <div>
        <IconButton onClick={wrapWithReset(onEntityBulkDelete)}>
          <DeleteIcon />
        </IconButton>
        <ChangeStatus options={options} onOptionClick={onStatusChanged}>
          {({ handleClick }) => (
            <IconButton onClick={handleClick}>
              <DoneAllIcon />
            </IconButton>
          )}
        </ChangeStatus>
      </div>
    );
  };

export default getCustomSelectBar;
