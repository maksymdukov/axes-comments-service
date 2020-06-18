import mongoose from 'mongoose';

export interface OrderItem {
  id: string;
  slug: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
  price: number;
  count: number;
}

export const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    count: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: {
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    },
  },
  { _id: false }
);
