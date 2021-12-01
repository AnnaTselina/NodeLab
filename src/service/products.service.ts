import { ProductRepository } from '../DA/DBManager';
import { IProductSearchParams } from '../types/types';

export class ProductsService {
  public async getProducts(queryParams: IProductSearchParams) {
    const data = await ProductRepository.getProducts(queryParams);
    return data;
  }
}
