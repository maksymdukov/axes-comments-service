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
        {items.map((cartItem) => {
          const {
            product: { images, languages },
          } = cartItem;
          return (
            <TableRow key={cartItem.id}>
              <TableCell>{languages[0].title}</TableCell>
              <TableCell>
                {images && images[0] && (
                  <img
                    src={images[0].url}
                    alt={"img"}
                    style={{ width: 100, height: "auto" }}
                  />
                )}
              </TableCell>
              <TableCell>{cartItem.currentPrice}</TableCell>
              <TableCell>{cartItem.qty}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CartItems;
