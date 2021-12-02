import { CategoryRepository } from '../DA/DBManager';

export class CategoryService {
  public async getCategories() {
    const data = await CategoryRepository.getCategories();
    return data;
  }
}
