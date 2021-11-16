import { ICategoryRepository, ICategory } from '../../../types/types';
import { CategoryEntity } from '../../postgresql/entities/category.entity';

class CategoryTypeOrmRepository implements ICategoryRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryEntity.find();
    return data;
  }
}

export default CategoryTypeOrmRepository;
