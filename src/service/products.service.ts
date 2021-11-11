import { ProductsHelper } from '../DA/DBManager';

export class ProductsService {
  public async getProducts() {
    const data = await ProductsHelper.getProducts();
    return data;
  }
}
