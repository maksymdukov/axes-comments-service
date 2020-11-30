import React from "react";
import { Box } from "@material-ui/core";
import Group from "./group";
import GroupItem from "./group-item";
import CartItems from "./cart-items";
import UserImages from "./user-images";
import { orderStatusTransalted } from "../orders.constants";
import { getTotalOrderSum } from "../orders.utils";

const OrderCard = ({ entity }) => {
  const {
    comment,
    createdAt,
    status,
    user,
    anonymousUser,
    delivery,
    details,
    customDetails,
  } = entity;
  const { address, branch, settlement, idx } = delivery;
  const isAnonymous = !!anonymousUser;
  const isCustom = !!customDetails.length;
  const isOrdinary = !isCustom;
  const usr = isAnonymous ? anonymousUser : user;

  const totalSum = getTotalOrderSum(details);
  return (
    <Box mb={2} flexGrow="1">
      <Group label="Покупатель">
        <GroupItem label="Email">{usr.email}</GroupItem>
        <GroupItem label="Имя">{usr.profile.firstName}</GroupItem>
        <GroupItem label="Фамилия">{usr.profile.lastName}</GroupItem>
        <GroupItem label="Телефон">{usr.profile.phone}</GroupItem>
        {comment && (
          <GroupItem label="Комментарий клиента">{comment}</GroupItem>
        )}
      </Group>

      <Group label="Доставка">
        <GroupItem label="Тип">{delivery.type}</GroupItem>
        {settlement && <GroupItem label="Локация">{settlement}</GroupItem>}
        {branch && <GroupItem label="Отделение">{branch}</GroupItem>}
        {address && <GroupItem label="Адрес">{address}</GroupItem>}
        {idx && <GroupItem label="Индекс">{idx}</GroupItem>}
      </Group>

      <Group label="Заказ">
        <GroupItem label="Статус">{orderStatusTransalted[status]}</GroupItem>
        <GroupItem label="Дата">
          {new Date(createdAt).toLocaleString()}
        </GroupItem>
        {isOrdinary && (
          <GroupItem label="Общая сумма">{totalSum} грн</GroupItem>
        )}
      </Group>

      {isOrdinary && (
        // Usual order
        <Group label="Товары">
          <CartItems items={details} />
        </Group>
      )}

      {isCustom && (
        // Custom order
        <Group label="Пользовательские картинки">
          <UserImages custom={customDetails} />
        </Group>
      )}
    </Box>
  );
};

export default OrderCard;
