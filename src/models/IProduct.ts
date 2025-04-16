export interface IProductPrice {
  value: number;
  symbol: string;
}

export interface IProduct {
  _id: string;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: Date;
    end: Date;
  };
  price: IProductPrice[];
}

export interface IProductType {
  name: string;
}
