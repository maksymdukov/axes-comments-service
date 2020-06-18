import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";

const CartItems = ({ items }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {["Название", "Картинка", "Стоимость, грн", "Кол-во"].map((item) => (
            <TableCell key={item}>{item}</TableCell>
          ))}
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
  );
};

export default CartItems;
