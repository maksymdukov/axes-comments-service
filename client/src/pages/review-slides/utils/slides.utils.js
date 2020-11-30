import { actionsColumn } from "components/tables/columns";

export const getSlidesColumns = ({ onEditClick, onDeleteClick, edit }) => [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "Название",
  },
  actionsColumn({ onDeleteClick, onEditClick, edit }),
];
