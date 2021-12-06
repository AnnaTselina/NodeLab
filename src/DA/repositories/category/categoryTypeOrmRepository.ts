import { ICategoryRepository, ICategory } from '../../../types/types';
import { CategoryEntity } from '../../postgresql/entities/category.entity';
class CategoryTypeOrmRepository implements ICategoryRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryEntity.find({
      select: ['_id', 'displayName']
    });
    return data;
  }

  async getCategoryById(categoryId: string): Promise<ICategory | null> {
    const data = await CategoryEntity.createQueryBuilder('category')
      .where({ _id: categoryId })
      .innerJoin('category.products', 'product')
      .select(['category._id', 'category.displayName', 'product.displayName', 'product.price', 'product.totalRating'])
      .orderBy('product.totalRating', 'DESC')
      .limit(3)
      .getOne();

    return data ? data : null;
  }
}

export default CategoryTypeOrmRepository;
