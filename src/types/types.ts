import mongoose from 'mongoose';

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
  _id: number;
  displayName: string;
  createdAt: Date;
}

export interface IProductRepository {
  getProducts: () => Promise<IProduct[]>;
}
