export const orderStatus = {
  NEW: "new",
  PROCESSING: "processing",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

export const orderStatusTransalted = {
  [orderStatus.NEW]: 'Новый',
  [orderStatus.PROCESSING]: 'В обработке',
  [orderStatus.COMPLETED]: 'Завершен',
  [orderStatus.CANCELED]: 'Отменен',
};