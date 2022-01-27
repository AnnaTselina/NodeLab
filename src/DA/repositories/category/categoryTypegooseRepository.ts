import { ICategorySearchParams } from './../../../types/types';
import { CategoryModel } from '../../mongoDB/models/category.model';
import { ProductClass, ProductModel } from '../../mongoDB/models/product.model';
import { ICategory } from '../../../types/types';
import checkProductIdsValid from '../../../helpers/productIdsValidation';
import HttpException from '../../../exceptions/exceptions';

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

  async getCategoryByName(displayName: string) {
    const data = await CategoryModel.findOne({ displayName });
    return data ? data : null;
  }

  async createCategory(displayName: string, productIds?: string[]) {
    const category: { displayName: string; createdAt: Date; products?: string[] } = {
      displayName,
      createdAt: new Date()
    };
    if (productIds) {
      await checkProductIdsValid(productIds);
      category.products = productIds;
    }
    const data = await CategoryModel.create(category);
    const result = await data.save();

    const updateProductsWithNewCategory = await ProductModel.updateMany(
      { _id: { $in: productIds } },
      {
        $push: {
          categories: result._id
        }
      }
    );

    return result && updateProductsWithNewCategory ? result : null;
  }

  async updateCategory(id: string, displayName?: string, productIds?: string[]) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new HttpException(404, `Category with id=${id} not found.`);
    }
    if (displayName) {
      category.displayName = displayName;
    }
    if (productIds) {
      await checkProductIdsValid(productIds);
      const oldProductsIds = category.products?.map((id) => id.toString());
      category.set({ products: productIds });
      await ProductModel.updateMany({ _id: { $in: oldProductsIds } }, { $pull: { categories: id } });
      await ProductModel.updateMany({ _id: { $in: productIds } }, { $push: { categories: id } });
    }
    const result = await category.save();

    return result ? result : null;
  }
}

export default CategoryTypegooseRepository;
