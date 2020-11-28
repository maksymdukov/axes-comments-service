import { actionsColumn, nameColumn } from "components/tables/columns";

export const getProductsColumns = ({
  onEditClick,
  onDeleteClick,
  products,
}) => [
  {
    name: "id",
    label: "ID",
  },
  nameColumn({ entities: products }),
  actionsColumn({ onDeleteClick, onEditClick }),
];
