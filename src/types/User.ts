export type User = {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
  productIds?: number[];
};

export type UserInput = {
  username: string;
  productIds?: number[];
};