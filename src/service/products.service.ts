import { ProductRepository } from '../DA/DBManager';

export class ProductsService {
  public async getProducts() {
    const data = await ProductRepository.getProducts();
    return data;
  }
}
