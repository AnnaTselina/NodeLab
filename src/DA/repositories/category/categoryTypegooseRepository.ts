import CategoryModel from '../../mongoDB/models/category.model';
import { ICategory } from '../../../types/types';

class CategoryTypegooseRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryModel.find();
    return data;
  }
}

export default CategoryTypegooseRepository;
