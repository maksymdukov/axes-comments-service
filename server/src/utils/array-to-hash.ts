export interface Hash<T> {
  [key: string]: T;
}

export const arrayToHash = <T, A extends keyof T & string>(
  array: T[],
  idAccessor: A
): Hash<T> => {
  return array.reduce((accumulator: any, item: T) => {
    accumulator[item[idAccessor]] = item;
    return accumulator;
  }, {});
};
