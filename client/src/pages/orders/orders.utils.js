import { orderStatusTransalted } from "./orders.constants";

export const getOrderColumns = ({ entities }) => [
  { name: "id", label: "ID" },
  {
    name: "status",
    label: "Сатус",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return orderStatusTransalted[entities[dataIndex].status];
      },
    },
  },
  {
    name: "type",
    label: "Тип",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return entities[dataIndex].details.length
          ? "Обычный"
          : "Индивидуальный";
      },
    },
  },
  {
    name: "sum",
    label: "Сумма заказа",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return getTotalOrderSum(entities[dataIndex].details);
      },
    },
  },
  {
    name: "createdAt",
    label: "Дата",
    options: {
      customBodyRenderLite: (dataIndex) => {
        return new Date(entities[dataIndex].createdAt).toLocaleDateString();
      },
    },
  },
];

export const getTotalOrderSum = (details) =>
  details.reduce(
    (acc, orderDetail) => acc + orderDetail.currentPrice * orderDetail.qty,
    0
  );
