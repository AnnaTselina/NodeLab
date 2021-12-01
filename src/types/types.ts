import mongoose from 'mongoose';
import { FindOperator } from 'typeorm';

type ObjectId = mongoose.Schema.Types.ObjectId;

export interface IProduct {
  _id?: ObjectId | number;
  displayName: string;
  createdAt: Date;
  categoryId: ObjectId | number;
  totalRating: number;
  price: number;
}

export interface ICategory {
  _id?: ObjectId | number;
  displayName: string;
  createdAt: Date;
}

export interface IProductSearchParams {
  displayName?: string;
  minRating?: number;
  price?: string;
  sortBy?: string;
  page?: number;
}

export interface IProductRepository {
  getProducts: (queryParams: IProductSearchParams) => Promise<IProduct[]>;
}

export interface ICategoryRepository {
  getCategories: () => Promise<ICategory[]>;
}

export interface IProductFilterParamsMongo {
  displayName?: string;
  totalRating?: { $gte: number };
  price?: { $gte: number; $lte: number };
}

export interface IProductFilterParamsPostgres {
  displayName?: string;
  totalRating?: FindOperator<number | undefined>;
  price?: FindOperator<number | undefined>;
}
