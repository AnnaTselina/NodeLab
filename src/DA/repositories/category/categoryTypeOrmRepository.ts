import checkProductIdsValid from '../../../helpers/productIdsValidation';
import { ICategoryRepository, ICategory, ICategorySearchParams } from '../../../types/types';
import { CategoryEntity } from '../../postgresql/entities/category.entity';
import { ProductEntity } from '../../postgresql/entities/product.entity';
import HttpException from '../../../exceptions/exceptions';

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

  async getCategoryByName(displayName: string) {
    const data = await CategoryEntity.findOne({ displayName });

    return data ? data : null;
  }

  async createCategory(displayName: string, productIds?: string[]) {
    let products;
    if (productIds) {
      const productsEntities = await ProductEntity.createQueryBuilder('product')
        .where('product._id IN (:...productIds)', {
          productIds
        })
        .getMany();
      await checkProductIdsValid(productIds, products);
      products = productsEntities;
    }

    const category = new CategoryEntity();
    category.displayName = displayName;
    category.createdAt = new Date();
    category.products = products;
    const result = await category.save();

    return result ? result : null;
  }

  async updateCategory(id: string, displayName?: string, productIds?: string[]) {
    const category = await CategoryEntity.findOne(id);
    let result;
    if (category) {
      if (displayName) {
        category.displayName = displayName;
      }
      if (productIds) {
        const products = await ProductEntity.createQueryBuilder('product')
          .where('product._id IN (:...productIds)', {
            productIds
          })
          .getMany();
        await checkProductIdsValid(productIds, products);
        category.products = products;
      }
      result = await category.save();
    } else {
      throw new HttpException(404, `Category with id=${id} not found.`);
    }

    return result ? result : null;
  }
}

export default CategoryTypeOrmRepository;
