import { Entry } from 'contentful';

export interface AxeEntry {
  title: string;
  description: string;
  longDescription: any;
  images: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  }[];
  price: number;
  slug: string;
  pendingCount?: number;
  approvedCount?: number;
}

export interface Axe {
  fields: AxeEntry;
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface NormilizedAxe {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  pendingCount?: number;
  approvedCount?: number;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
}

export const normilizeAxeEntry = (axe: Entry<AxeEntry>) => {
  const {
    fields: {
      title,
      slug,
      description,
      price,
      images,
      pendingCount,
      approvedCount,
    },
    sys: { createdAt, updatedAt, id },
  } = axe;
  const resultingObject: NormilizedAxe = {
    id,
    createdAt,
    updatedAt,
    title,
    slug,
    description,
    price,
    image: null,
    ...(pendingCount && { pendingCount }),
    ...(approvedCount && { approvedCount }),
  };
  if (images && images.length) {
    resultingObject.image = {
      url: images[0].fields.file.url,
      width: images[0].fields.file.details.image.width,
      height: images[0].fields.file.details.image.height,
    };
  }
  return resultingObject;
};
