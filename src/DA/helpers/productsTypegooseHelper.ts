import ProductModel from '../mongoDB/models/product.model';
import { IProduct } from '../../types/types';

class ProductsTypegooseHelper {
  async getProducts(): Promise<IProduct[]> {
    const data = await ProductModel.find();
    return data;
  }
}

export default ProductsTypegooseHelper;
