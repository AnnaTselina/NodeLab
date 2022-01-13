import { ICategoryRepository, ICategory, ICategorySearchParams } from '../../../types/types';
import { CategoryEntity } from '../../postgresql/entities/category.entity';
class CategoryTypeOrmRepository implements ICategoryRepository {
  async getCategories(): Promise<ICategory[]> {
    const data = await CategoryEntity.find({
      select: ['_id', 'displayName']
    });
    return data;
  }

  async getCategoryById(categoryId: string, queryParams: ICategorySearchParams): Promise<ICategory | null> {
    const { includeProducts, includeTop3Products } = queryParams;
    const query = CategoryEntity.createQueryBuilder('category').where({ _id: categoryId });
    if (includeProducts && includeProducts === 'true') {
      query
        .innerJoin('category.products', 'product')
        .select([
          'category._id',
          'category.displayName',
          'product.displayName',
          'product.price',
          'product.totalRating'
        ]);

      if (includeTop3Products && includeTop3Products === 'top') {
        query.orderBy('product.totalRating', 'DESC').limit(3);
      }
    }

    const data = await query.getOne();

    return data ? data : null;
  }

  async getCategoriesById(categoryIds: string[]) {
    const data = await CategoryEntity.createQueryBuilder('category')
      .where('category._id IN (:...categoryIds)', {
        categoryIds
      })
      .getMany();
    return data ? data : null;
  }
}

export default CategoryTypeOrmRepository;
