import mongoDBConnect from './mongoDB';
import postgreSQLConnect from './postgresql';
import {
  IProductRepository,
  ICategoryRepository,
  IUserRepository,
  IUserRatingsRepository,
  IOrderListRepository
} from '../types/types';
import getProductRepository from './repositories/product/productRepository';
import getCategoryRepository from './repositories/category/categoryRepository';
import getUserRepository from './repositories/user/userRepository';
import getUserRatingsRepository from './repositories/userRatings/userRatingsRepository';
import getOrderListRepository from './repositories/orderLists/orderListRepository';

export let ProductRepository: IProductRepository;
export let CategoryRepository: ICategoryRepository;
export let UserRepository: IUserRepository;
export let UserRatingsRepository: IUserRatingsRepository;
export let OrderListRepository: IOrderListRepository;

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
    UserRatingsRepository = getUserRatingsRepository();
    OrderListRepository = getOrderListRepository();
  } else {
    throw new Error('Missing database environmental variable.');
  }
};
