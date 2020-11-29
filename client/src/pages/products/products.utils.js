import { actionsColumn, nameColumn } from "components/tables/columns";

export const getProductsColumns = ({
  onEditClick,
  onDeleteClick,
  entities,
}) => [
  {
    name: "id",
    label: "ID",
  },
  nameColumn({ entities }),
  actionsColumn({ onDeleteClick, onEditClick }),
];
