import mongoDBConnect from './mongoDB';
import postgreSQLConnect from './postgresql';
import { IProductRepository, ICategoryRepository } from '../types/types';
import ProductTypegooseRepository from './repositories/product/productsTypegooseRepository';
import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';

export let ProductRepository: IProductRepository;
export let CategoryRepository: ICategoryRepository;

export const dbConnection = async () => {
  if (process.env['DB'] === 'mongo') {
    await mongoDBConnect();
    ProductRepository = new ProductTypegooseRepository();
    CategoryRepository = new CategoryTypegooseRepository();
  } else {
    await postgreSQLConnect();
    ProductRepository = new ProductTypeOrmRepository();
    CategoryRepository = new CategoryTypeOrmRepository();
  }
};
