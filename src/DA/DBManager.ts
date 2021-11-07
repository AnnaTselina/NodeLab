import mongoDBConnect from './mongoDB';
import {IProduct, IProductsHelper} from '../types/types'
import ProductsTypegooseHelper from './helpers/productsTypegooseHelper';


export let ProductsHelper: IProductsHelper<IProduct>;

export const dbConnection = () => {
    mongoDBConnect();

    ProductsHelper = new ProductsTypegooseHelper();
}