import mongoose from 'mongoose';

type ObjectId = mongoose.Schema.Types.ObjectId;

export interface IProduct {
  _id: ObjectId;
  displayName: string;
  createdAt: Date;
  categoryId: ObjectId;
  totalRating: number;
  price: number;
}

export interface IProductsHelper {
  getProducts: () => Promise<IProduct[]>;
}
