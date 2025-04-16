import { IProduct } from "./IProduct";

export interface IOrder {
  _id: string;
  title: string;
  date: string;
  products: IProduct[];
  productCount?: number;
  totalUSD: number;
  totalOtherCurrency: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrder {
  title: string;
  date: string;
  productIds: string[];
}

export interface IUpdateOrder {
  title: string;
  date: string;
}
