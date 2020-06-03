export interface PaginationAttrs {
  page?: string;
  size?: string;
}

const DEFAULT_PAGE_NUMBER = '1';
const DEFAULT_PAGE_SIZE = '10';

export const getPaginationQuery = ({ page, size }: PaginationAttrs) => {
  const pg = parseInt(page || DEFAULT_PAGE_NUMBER);
  const sz = parseInt(size || DEFAULT_PAGE_SIZE);
  return {
    pgQuery: {
      skip: (pg - 1) * sz,
      limit: sz,
    },
    pg,
    sz,
  };
};
