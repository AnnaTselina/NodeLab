import { ICategoryRepository, ICategory } from '../../../types/types';
import { CategoryEntity } from '../../postgresql/entities/category.entity';

class CategoryTypeOrmRepository implements ICategoryRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryEntity.find({
      select: ['_id', 'displayName']
    });
    return data;
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    const data = await CategoryEntity.findOne({
      where: { _id: id },
      select: ['_id', 'displayName']
    });
    return data ? data : null;
  }
}

export default CategoryTypeOrmRepository;
