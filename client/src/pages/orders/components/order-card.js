import React from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import Group from "./group";
import GroupItem from "./group-item";
import { orderStatusTranslated } from "constants/order-status";
import CartItems from "./cart-items";
import UserImages from "./user-images";

const OrderCard = ({
  order: {
    customer: { email, name, surname, phone, comments },
    delivery: { type, npNumber, npSettlement, ukrAddress },
    status,
    items,
    createdAt,
    custom,
  },
  totalSum,
}) => {
  return (
    <Box mb={2} flexGrow="1">
      <Card elevation={0}>
        <CardContent>
          <Group label="Покупатель">
            <GroupItem label="Email">{email}</GroupItem>
            <GroupItem label="Имя">{name}</GroupItem>
            <GroupItem label="Фамилия">{surname}</GroupItem>
            <GroupItem label="Телефон">{phone}</GroupItem>
            {comments && (
              <GroupItem label="Комментарий клиента">{comments}</GroupItem>
            )}
          </Group>

          <Group label="Доставка">
            <GroupItem label="Тип">{type}</GroupItem>
            {npSettlement && (
              <GroupItem label="Локация">{npSettlement}</GroupItem>
            )}
            {npNumber && <GroupItem label="Отделение">{npNumber}</GroupItem>}
            {ukrAddress && <GroupItem label="Адрес">{ukrAddress}</GroupItem>}
          </Group>

          <Group label="Заказ">
            <GroupItem label="Статус">
              {orderStatusTranslated[status]}
            </GroupItem>
            <GroupItem label="Дата">
              {new Date(createdAt).toLocaleString()}
            </GroupItem>
            {!custom && (
              <GroupItem label="Общая сумма">{totalSum} грн</GroupItem>
            )}
          </Group>

          {!custom && (
            // Usual order
            <Group label="Товары">
              <CartItems items={items} />
            </Group>
          )}

          {custom && (
            // Custom order
            <Group label="Пользовательские картинки">
              <UserImages custom={custom} />
            </Group>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCard;
