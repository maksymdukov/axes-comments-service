import React from "react";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Group from "./group";
import GroupItem from "./group-item";
import { orderStatusTranslated } from "constants/order-status";

const OrderCard = ({
  order: {
    customer: { email, name, surname, phone },
    delivery: { type, npNumber, ukrAddress },
    status,
    items,
    createdAt,
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
          </Group>
          <Group label="Доставка">
            <GroupItem label="Тип">{type}</GroupItem>
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
            <GroupItem label="Общая сумма">{totalSum} грн</GroupItem>
          </Group>
          <Group label="Товары">
            <Table>
              <TableHead>
                <TableRow>
                  {["Название", "Картинка", "Стоимость, грн", "Кол-во"].map(
                    (item) => (
                      <TableCell key={item}>{item}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((cartItem) => (
                  <TableRow key={cartItem.id}>
                    <TableCell>{cartItem.title}</TableCell>
                    <TableCell>
                      {cartItem.image && (
                        <img
                          src={cartItem.image.url}
                          alt={cartItem.title}
                          style={{ width: 100, height: "auto" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{cartItem.price}</TableCell>
                    <TableCell>{cartItem.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Group>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderCard;
