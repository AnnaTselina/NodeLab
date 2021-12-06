import { CategoryRepository } from '../DA/DBManager';
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
}
