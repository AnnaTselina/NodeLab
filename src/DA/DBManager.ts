import mongoDBConnect from './mongoDB';
import {IProductsHelper} from '../types/types'
import ProductsTypegooseHelper from './helpers/productsTypegooseHelper';


export let ProductsHelper: IProductsHelper;

export const dbConnection = async () => {
    await mongoDBConnect();

    ProductsHelper = new ProductsTypegooseHelper();
}