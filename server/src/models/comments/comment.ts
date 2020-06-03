import mongoose from 'mongoose';
import { CommentStatus } from './status';
import { getPaginationQuery, PaginationAttrs } from '../../utils/pagination';
import { AxeEntry } from '../../utils/normalize';
import { Entry } from 'contentful';

interface CommentDocument extends mongoose.Document {
  slug: string;
  author: {
    name: string;
  };
  status: CommentStatus;
  rating?: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentAttrs {
  slug: string;
  author: {
    name: string;
  };
  rating?: number;
  message: string;
}

type FindByStatusAttrs = {
  status?: CommentStatus;
  slug?: string;
} & PaginationAttrs;

interface CommentModel extends mongoose.Model<CommentDocument> {
  build(attrs: CommentAttrs): CommentDocument;
  findApprovedBySlug(slug: string): Promise<CommentDocument[]>;
  findByStatusAndSlug(
    attrs: FindByStatusAttrs
  ): Promise<{ total: number; comments: CommentDocument[] }>;
  countPendingBySlugs(axes: Entry<AxeEntry>[]): Promise<Entry<AxeEntry>[]>;
}

const commentSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: Object.values(CommentStatus),
      default: CommentStatus.pending,
      required: true,
    },
    rating: {
      type: Number,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

commentSchema.statics.build = function (attrs: CommentAttrs) {
  return new Comment({
    slug: attrs.slug,
    author: attrs.author,
    rating: attrs.rating,
    message: attrs.message,
  });
};

commentSchema.statics.findApprovedBySlug = function (slug: string) {
  return Comment.find({ slug, status: CommentStatus.approved }, null, {
    sort: { createdAt: -1 },
  });
};

commentSchema.statics.findByStatusAndSlug = async function ({
  status,
  page,
  size,
  slug,
}: FindByStatusAttrs) {
  const dbQuery: Pick<FindByStatusAttrs, 'status' | 'slug'> = {};

  if (status) {
    dbQuery.status = status;
  }

  if (slug) {
    dbQuery.slug = slug;
  }
  const { pgQuery, pg, sz } = getPaginationQuery({ page, size });
  const total = await Comment.countDocuments(dbQuery);
  const comments = await Comment.find(dbQuery, null, {
    sort: { createdAt: -1 },
    ...pgQuery,
  });
  return { total, items: comments, page: pg, size: sz };
};

commentSchema.statics.countPendingBySlugs = async function (
  axes: Entry<AxeEntry>[]
) {
  const pendingPromises = axes.map((axe) =>
    Comment.countDocuments({
      slug: axe.fields.slug,
      status: CommentStatus.pending,
    })
  );
  const approvedPromises = axes.map((axe) =>
    Comment.countDocuments({
      slug: axe.fields.slug,
      status: CommentStatus.approved,
    })
  );

  const countResults = await Promise.all(
    pendingPromises.concat(approvedPromises)
  );
  axes.forEach((axe, idx) => {
    axe.fields.pendingCount = countResults[idx];
    axe.fields.approvedCount = countResults[axes.length + idx];
  });
  return axes;
};

export const Comment = mongoose.model<CommentDocument, CommentModel>(
  'comment',
  commentSchema
);
