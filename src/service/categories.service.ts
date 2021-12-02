import { CategoryRepository } from '../DA/DBManager';

export class CategoryService {
  public async getCategories() {
    const data = await CategoryRepository.getCategories();
    return data;
  }

  public async getCategoryById(id: string) {
    const data = await CategoryRepository.getCategoryById(id);
    return data;
  }
}
