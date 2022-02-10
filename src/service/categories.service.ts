import { CategoryRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import { ICategorySearchParams } from '../types/types';

export class CategoryService {
  public async getCategories() {
    const data = await CategoryRepository.getCategories();
    return data;
  }

  public async getCategoryById(id: string, queryParams: ICategorySearchParams) {
    const data = await CategoryRepository.getCategoryById(id, queryParams);
    return data;
  }

  public async createCategory(displayName: string, productIds?: string[]) {
    const category = await CategoryRepository.getCategoryByName(displayName);
    if (category) {
      throw new HttpException(400, 'Category with provided name already exists.');
    }

    const createResult = await CategoryRepository.createCategory(displayName, productIds);
    return createResult;
  }

  public async updateCategory(id: string, displayName?: string, productIds?: string[]) {
    const updateResult = await CategoryRepository.updateCategory(id, displayName, productIds);
    return updateResult;
  }

  public async deleteCategory(id: string) {
    const deleteResult = await CategoryRepository.deleteCategory(id);
    return deleteResult;
  }
}
