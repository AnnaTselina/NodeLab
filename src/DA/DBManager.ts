//import mongoDBConnect from './mongoDB';
import { IProductsHelper } from '../types/types';
//import ProductsTypegooseHelper from './helpers/productsTypegooseHelper';
import postgreSQLConnect from './postgresql';

export let ProductsHelper: IProductsHelper;

export const dbConnection = async () => {
  /*await mongoDBConnect();

  ProductsHelper = new ProductsTypegooseHelper();*/
  postgreSQLConnect();
};
