import { CategoryModel } from '../../mongoDB/models/category.model';
import { ProductClass } from '../../mongoDB/models/product.model';
import { ICategory } from '../../../types/types';

class CategoryTypegooseRepository {
  async getCategories(): Promise<ICategory[] | null> {
    const data = await CategoryModel.find({}, '_id displayName');
    return data ? data : null;
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    const data = await CategoryModel.findOne({ _id: id }, '_id displayName').populate({
      path: 'products',
      model: ProductClass,
      options: { sort: { totalRating: 'DESC' }, limit: 3 },
      select: 'displayName price totalRating -_id'
    });

    return data ? data : null;
  }
}

export default CategoryTypegooseRepository;
