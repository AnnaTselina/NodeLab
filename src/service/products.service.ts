import { ProductRepository } from '../DA/DBManager';
import { IProductSearchParams } from '../types/types';

export class ProductsService {
  public async getProducts(queryParams: IProductSearchParams) {
    const data = await ProductRepository.getProducts(queryParams);
    return data;
  }

  public async getProductById(id: string) {
    const data = await ProductRepository.getProductById(id);
    return data;
  }

  public async updateProductTotalRating(id: string, newRating: number) {
    const data = await ProductRepository.updateProductTotalRating(id, newRating);
    return data;
  }
}
