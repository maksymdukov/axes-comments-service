import mongoose from 'mongoose';
import { Delivery } from './delivery';
import { orderItemSchema, OrderItem } from './order-item';
import { OrderStatus } from './status';
import {
  getPaginationQuery,
  PaginationAttrs,
  PaginatedOutput,
} from '../../utils/pagination';
import { deleteFile } from '../../services/firebase';

interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  customer: {
    email: string;
    name: string;
    surname: string;
    phone: string;
    comments: string;
  };
  delivery: {
    type: string;
    npNumber?: string;
    npSettlement?: string;
    ukrAddress?: string;
  };
  items?: OrderItem[];
  custom: { images: string[] } | null;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
  findAllPaginated(attrs: FindAllAttrs): Promise<PaginatedOutput<OrderDoc[]>>;
}

type FindAllAttrs = {
  status?: OrderStatus;
} & PaginationAttrs;

export interface OrderAttrs {
  email: string;
  name: string;
  surname: string;
  phone: string;
  comments?: string;
  delivery: string;
  npNumber?: string;
  npSettlement?: string;
  ukrAddress?: string;
  items?: OrderItem[];
  customImages?: string[];
}

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.new,
    },
    customer: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      surname: { type: String, required: true },
      phone: { type: String, required: true },
      comments: { type: String },
    },
    delivery: {
      type: { type: String, enum: Object.values(Delivery), required: true },
      npNumber: { type: String },
      npSettlement: { type: String },
      ukrAddress: { type: String },
    },
    items: {
      type: [orderItemSchema],
    },
    custom: {
      type: {
        images: [String],
      },
      default: null,
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
    timestamps: true,
  }
);

orderSchema.statics.build = function (attrs: OrderAttrs) {
  return new Order({
    customer: {
      email: attrs.email,
      name: attrs.name,
      surname: attrs.surname,
      phone: attrs.phone,
      comments: attrs.comments,
    },
    delivery: {
      type: attrs.delivery,
      npNumber: attrs.npNumber,
      npSettlement: attrs.npSettlement,
      ukrAddress: attrs.ukrAddress,
    },
    items: attrs.items,
    custom: attrs.customImages
      ? {
          images: attrs.customImages,
        }
      : null,
  });
};

orderSchema.statics.findAllPaginated = async function ({
  page,
  size,
  status,
}: FindAllAttrs) {
  const dbQuery: { status?: OrderStatus } = {};
  if (status) {
    dbQuery.status = status;
  }
  const total = await Order.countDocuments(dbQuery);
  const { pgQuery, pg, sz } = getPaginationQuery({ page, size });
  // exclude author's email
  const orders = await Order.find(dbQuery, null, {
    sort: { createdAt: -1 },
    ...pgQuery,
  });
  return { total, items: orders, page: pg, size: sz };
};

orderSchema.post<OrderDoc>('remove', async function (doc) {
  // remove images in google cloud storage
  if (doc.custom) {
    const deletePromises: Promise<void>[] = [];
    doc.custom.images.forEach((image) =>
      deletePromises.push(deleteFile(image))
    );
    await Promise.all(deletePromises);
  }
});

export const Order = mongoose.model<OrderDoc, OrderModel>('order', orderSchema);
