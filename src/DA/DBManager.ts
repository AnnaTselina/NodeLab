import mongoDBConnect from './mongoDB';
import ProductsTypegooseHelper from './helpers/product/productsTypegooseRepository';
import { IProductRepository } from '../types/types';
import ProductTypeOrmRepository from './helpers/product/productTypeOrmRepository';
import postgreSQLConnect from './postgresql';

export let ProductsHelper: IProductRepository;

export const dbConnection = async () => {
  if (process.env['DB'] === 'mongo') {
    await mongoDBConnect();
    ProductsHelper = new ProductsTypegooseHelper();
  } else {
    await postgreSQLConnect();
    ProductsHelper = new ProductTypeOrmRepository();
  }
};
