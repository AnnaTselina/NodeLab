import { ProductModel } from '../../mongoDB/models/product.model';
import { IProductSearchParams, IProduct } from '../../../types/types';
import { parseProductQuerySearchParams } from '../../../helpers/productParamsParser';
import checkCategoryIdsValid from '../../../helpers/categoryIdsValidation';
import { CategoryModel } from '../../mongoDB/models/category.model';

class ProductTypegooseRepository {
  async getProducts(queryParams: IProductSearchParams): Promise<IProduct[]> {
    const { filterParams, sortingParams, skipParam } = parseProductQuerySearchParams<true>(queryParams);
    const pageSize = Number(process.env['PAGE_SIZE']);

    const data = await ProductModel.find(filterParams).skip(skipParam).limit(pageSize).sort(sortingParams);
    return data;
  }

  async getProductById(id: string) {
    const data = await ProductModel.findById(id);
    return data ? data : null;
  }

  async updateProductTotalRating(id: string, newRating: number) {
    const data = await ProductModel.findByIdAndUpdate({ _id: id }, { totalRating: newRating });
    return data ? true : false;
  }

  async getProductsByIds(productsIds: string[]) {
    const data = await ProductModel.find().where('_id').in(productsIds);
    return data ? data : null;
  }

  async getProductByName(displayName: string) {
    const data = await ProductModel.findOne().where({ displayName });
    return data ? data : null;
  }

  async createNewProduct(displayName: string, categoryIds: string[], price: number) {
    await checkCategoryIdsValid(categoryIds);
    const data = await ProductModel.create({
      displayName,
      createdAt: new Date(),
      categories: categoryIds,
      price
    });

    const updateCategoryWithProductId = await CategoryModel.updateMany(
      { _id: { $in: categoryIds } },
      {
        $push: {
          products: data._id
        }
      }
    );

    return data && updateCategoryWithProductId ? data : null;
  }

  async updateProductInfo(id: string, displayName?: string, categoryIds?: string[], price?: number) {
    const infoToBeUpdated: {
      displayName?: string;
      price?: number;
      $set?: { categories: string[] };
    } = {};
    if (displayName) {
      infoToBeUpdated.displayName = displayName;
    }
    if (price) {
      infoToBeUpdated.price = price;
    }
    if (categoryIds) {
      infoToBeUpdated.$set = { categories: categoryIds };
    }

    const result = await ProductModel.findOneAndUpdate({ _id: id }, { ...infoToBeUpdated }, { new: true });

    return result ? result : null;
  }
}

export default ProductTypegooseRepository;
