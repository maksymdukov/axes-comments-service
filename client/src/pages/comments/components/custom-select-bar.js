import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ChangeStatus from "components/menus/change-status";
import { commentStatus } from "../comments.constants";
import { updateCommentStatusApi } from "../apis/update-comment-status.api";

const options = [
  { label: "Одобрить", value: commentStatus.APPROVED },
  { label: "Отклонить", value: commentStatus.CANCELLED },
  { label: "В ожидании", value: commentStatus.PENDING },
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
        updateCommentStatusApi(entities[dataIndex].id, { status })
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
