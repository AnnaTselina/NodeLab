import { ICategorySearchParams } from './../../../types/types';
import { CategoryModel } from '../../mongoDB/models/category.model';
import { ProductClass } from '../../mongoDB/models/product.model';
import { ICategory } from '../../../types/types';

class CategoryTypegooseRepository {
  async getCategories(): Promise<ICategory[] | null> {
    const data = await CategoryModel.find({}, '_id displayName');
    return data ? data : null;
  }

  async getCategoryById(id: string, queryParams: ICategorySearchParams): Promise<ICategory | null> {
    const { includeProducts, includeTop3Products } = queryParams;
    const data = await CategoryModel.findOne({ _id: id }, '_id displayName').populate(
      (includeProducts && includeProducts) === 'true'
        ? {
            path: 'products',
            model: ProductClass,
            select: 'displayName price totalRating -_id',
            options:
              includeTop3Products && includeTop3Products === 'top' ? { sort: { totalRating: 'DESC' }, limit: 3 } : {}
          }
        : ''
    );

    return data ? data : null;
  }

  async getCategoriesById(categoryIds: string[]) {
    const data = await CategoryModel.find().where('_id').in(categoryIds);
    return data ? data : null;
  }
}

export default CategoryTypegooseRepository;
