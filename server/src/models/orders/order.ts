import mongoose from 'mongoose';
import { Delivery } from './delivery';
import { orderItemSchema, OrderItem } from './order-item';

interface OrderDoc extends mongoose.Document {
  customer: {
    email: string;
    name: string;
    surname: string;
    phone: string;
  };
  delivery: {
    type: string;
    npNumber: string;
    ukrAddress: string;
  };
  items: OrderItem[];
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

export interface OrderAttrs {
  email: string;
  name: string;
  surname: string;
  phone: string;
  delivery: string;
  npNumber: string;
  ukrAddress: string;
  items: OrderItem[];
}

const orderSchema = new mongoose.Schema(
  {
    customer: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      surname: { type: String, required: true },
      phone: { type: String, required: true },
    },
    delivery: {
      type: { type: String, enum: Object.values(Delivery), required: true },
      npNumber: { type: String },
      ukrAddress: { type: String },
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

orderSchema.statics.build = function (attrs: OrderAttrs) {
  return new Order({
    customer: {
      email: attrs.email,
      name: attrs.name,
      surname: attrs.surname,
      phone: attrs.phone,
    },
    delivery: {
      type: attrs.delivery,
      npNumber: attrs.npNumber,
      ukrAddress: attrs.ukrAddress,
    },
    items: attrs.items,
  });
};

export const Order = mongoose.model<OrderDoc, OrderModel>('order', orderSchema);
