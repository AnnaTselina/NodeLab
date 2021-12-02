import CategoryModel from '../../mongoDB/models/category.model';
import { ICategory } from '../../../types/types';

class CategoryTypegooseRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryModel.find({}, '_id displayName');
    return data;
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    const data = await CategoryModel.findOne({ _id: id }, '_id displayName');
    return data ? data : null;
  }
}

export default CategoryTypegooseRepository;
