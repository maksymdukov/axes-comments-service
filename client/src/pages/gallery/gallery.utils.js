import React from "react";
import { actionsColumn } from "components/tables/columns";

export const getGalleryColumns = ({ onEditClick, onDeleteClick, images }) => [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "Имя",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return (
          images[dataIndex].languages && images[dataIndex].languages[0].title
        );
      },
    },
  },
  {
    name: "url",
    label: "Картинка",
    options: {
      customBodyRender: function ImageCellWrapper(val) {
        return (
          <img
            src={val}
            style={{
              width: 200,
              height: 100,
              objectFit: "contain",
            }}
          />
        );
      },
    },
  },
  actionsColumn({ onDeleteClick, onEditClick }),
];
