import mongoDBConnect from './mongoDB';
import postgreSQLConnect from './postgresql';
import { IProductRepository, ICategoryRepository } from '../types/types';
import getProductRepository from './repositories/product/productRepository';
import getCategoryRepository from './repositories/category/categoryRepository';

export let ProductRepository: IProductRepository;
export let CategoryRepository: ICategoryRepository;

export const dbConnection = async () => {
  if (process.env['DB']) {
    if (process.env['DB'] === 'mongo') {
      await mongoDBConnect();
    } else {
      await postgreSQLConnect();
    }
    ProductRepository = getProductRepository();
    CategoryRepository = getCategoryRepository();
  } else {
    throw new Error('Missing database environmental variable.');
  }
};
