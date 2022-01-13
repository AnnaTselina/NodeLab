import { ProductRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
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

  public async createNewProduct(displayName: string, categories: string[], price: number) {
    //check if product with the same name exists
    const productNameExists = await ProductRepository.getProductByName(displayName);
    if (productNameExists) {
      throw new HttpException(400, 'Product with provided displayName already exists.');
    }

    const result = await ProductRepository.createNewProduct(displayName, categories, price);
    return result;
  }
}
