export const getCommentsColumns = ({ entities }) => [
  { name: "id", label: "ID" },
  {
    name: "email",
    label: "email",
    options: {
      customBodyRenderLite: (dataIndex) => {
        const entity = entities[dataIndex];
        return (
          (entity.anonymousUser && entity.anonymousUser.email) ||
          (entity.user && entity.user.email)
        );
      },
    },
  },
  { name: "rating", label: "Оценка" },
  { name: "content", label: "Текст" },
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
