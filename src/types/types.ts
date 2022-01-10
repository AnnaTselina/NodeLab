import { CategoryClass } from './../DA/mongoDB/models/category.model';
import { Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { FindOperator } from 'typeorm';
import { ProductClass } from '../DA/mongoDB/models/product.model';

export type ObjectId = mongoose.Schema.Types.ObjectId;

export interface IProduct {
  _id?: ObjectId | number;
  displayName: string;
  createdAt: Date;
  categories: Ref<CategoryClass>[] | ICategory[];
  totalRating: number;
  price: number;
}

export interface ICategory {
  _id?: ObjectId | number;
  displayName: string;
  createdAt: Date;
  products?: Ref<ProductClass>[] | IProduct[];
}

export interface IProductSearchParams {
  displayName?: string;
  minRating?: number;
  price?: string;
  sortBy?: string;
  page?: number;
}

export interface ICategorySearchParams {
  includeProducts?: string;
  includeTop3Products?: string;
}

export interface IProductRepository {
  getProducts: (queryParams: IProductSearchParams) => Promise<IProduct[]>;
  getProductById: (id: string) => Promise<IProduct | null>;
  updateProductTotalRating: (id: string, newRating: number) => Promise<boolean>;
  getProductsByIds: (productsIds: string[]) => Promise<IProduct[] | null>;
}

export interface ICategoryRepository {
  getCategories: () => Promise<ICategory[] | null>;
  getCategoryById: (categoryId: string, queryParams: ICategorySearchParams) => Promise<ICategory | null>;
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

export type IProductFilterParams<isMongo = true> = isMongo extends true
  ? IProductFilterParamsMongo
  : IProductFilterParamsPostgres;

export interface IProductFilterParamsParsed<T> {
  filterParams: IProductFilterParams<T>;
  sortingParams: { [key: string]: string };
  skipParam: number;
}

export interface IUserRepository {
  createUser(userData: IUserRegistrationParams): Promise<string | null>;
  getUserByUsername(username: string): Promise<IUserAccount | null>;
  updateUserInfo(username: string, newUserInfo: IUserUpdateProfileParams): Promise<IUserAccount | null>;
  updateUserPassword(username: string, newPassword: string): Promise<boolean>;
}

export interface IUserRegistrationParams {
  username: string;
  password: string;
}

export interface IUserUpdateProfileParams {
  firstname?: string;
  lastname?: string;
}

export interface IUserAccount {
  _id: ObjectId | number;
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export interface IUserRatingsRepository {
  addRating(userId: string, productId: string, rating: number, comment?: string): Promise<boolean>;
  getUserRatingByProductId(userId: string, productId: string): Promise<IUserRating | null>;
  updateRating(userId: string, productId: string, rating: number, comment?: string): Promise<boolean>;
  countAverageProductRating(productId: string): Promise<number | null>;
}

export interface IUserRating {
  _id?: number;
  userId: number | ObjectId;
  productId?: number;
  rating: number;
  comment?: string;
}

export interface IOrderListRepository {
  getOrderListId: (userId: string) => Promise<ObjectId | number | null>;
  createOrderList: (userId: string) => Promise<ObjectId | number | null>;
  addProductsToOrderList: <T>(orderListId: T, products: IOrderListProduct[]) => Promise<IOrderListProducts<T> | null>;
}

export interface IOrderListProduct {
  product_id: string;
  quantity: number;
}

export interface IOrderListProducts<T> {
  _id: T;
  products: IOrderListProduct[];
}
