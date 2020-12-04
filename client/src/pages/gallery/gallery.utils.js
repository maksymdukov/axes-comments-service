import React from "react";
import { actionsColumn, nameColumn } from "components/tables/columns";

export const getGalleryColumns = ({ onEditClick, onDeleteClick, images }) => [
  {
    name: "id",
    label: "ID",
  },
  nameColumn({ entities: images }),
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
  {
    name: "widthheight",
    label: "Размер (ш-в)",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return `${images[dataIndex].width} x ${images[dataIndex].height}`;
      },
    },
  },
  actionsColumn({ onDeleteClick, onEditClick }),
];
