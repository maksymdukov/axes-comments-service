export const getOrderColumns = ({ entities }) => [
  { name: "id", label: "ID" },
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
