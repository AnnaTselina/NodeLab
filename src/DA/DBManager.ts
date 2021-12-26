import mongoDBConnect from './mongoDB';
import postgreSQLConnect from './postgresql';
import { IProductRepository, ICategoryRepository, IUserRepository } from '../types/types';
import getProductRepository from './repositories/product/productRepository';
import getCategoryRepository from './repositories/category/categoryRepository';
import getUserRepository from './repositories/user/userRepository';

export let ProductRepository: IProductRepository;
export let CategoryRepository: ICategoryRepository;
export let UserRepository: IUserRepository;

export const dbConnection = async () => {
  if (process.env['DB']) {
    if (process.env['DB'] === 'mongo') {
      await mongoDBConnect();
    } else {
      await postgreSQLConnect();
    }
    ProductRepository = getProductRepository();
    CategoryRepository = getCategoryRepository();
    UserRepository = getUserRepository();
  } else {
    throw new Error('Missing database environmental variable.');
  }
};
