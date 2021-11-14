//import mongoDBConnect from './mongoDB';
//import ProductsTypegooseHelper from './helpers/productsTypegooseHelper';
import { IProductRepository } from '../types/types';
import ProductTypeOrmRepository from './helpers/product/productTypeOrmRepository';
import postgreSQLConnect from './postgresql';

export let ProductsHelper: IProductRepository;

export const dbConnection = async () => {
  //await mongoDBConnect();
  postgreSQLConnect();

  ProductsHelper = new ProductTypeOrmRepository();
};
