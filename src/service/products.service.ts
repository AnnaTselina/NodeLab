import { ProductRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import { IProductSearchParams } from '../types/types';
import checkCategoryIdsValid from '../helpers/categoryIdsValidation';

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
    const productNameExists = await ProductRepository.getProductByName(displayName);
    if (productNameExists) {
      throw new HttpException(400, 'Product with provided displayName already exists.');
    }

    if (categories) {
      await checkCategoryIdsValid(categories);
    }

    const result = await ProductRepository.createNewProduct(displayName, categories, price);
    return result;
  }

  public async updateProductInfo(id: string, displayName?: string, categories?: string[], price?: number) {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      throw new HttpException(404, `Product with id=${id} not found.`);
    }

    if (categories) {
      await checkCategoryIdsValid(categories);
    }

    const updateMainInfoResult = await ProductRepository.updateProductInfo(id, displayName, categories, price);

    return updateMainInfoResult;
  }
}
