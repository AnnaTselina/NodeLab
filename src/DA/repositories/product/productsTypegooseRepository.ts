import { ProductModel } from '../../mongoDB/models/product.model';
import { IProductSearchParams, IProduct } from '../../../types/types';
import { parseProductQuerySearchParams } from '../../../helpers/productParamsParser';
import checkCategoryIdsValid from '../../../helpers/categoryIdsValidation';
import { CategoryModel } from '../../mongoDB/models/category.model';
import HttpException from '../../../exceptions/exceptions';

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
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new HttpException(404, `Product with id=${id} not found.`);
    }

    if (displayName) {
      product.displayName = displayName;
    }
    if (price) {
      product.price = price;
    }
    if (categoryIds) {
      await checkCategoryIdsValid(categoryIds);
      const oldCategoryIds = product.categories.map((id) => id.toString());
      product.set({ categories: categoryIds });
      await CategoryModel.updateMany({ _id: { $in: oldCategoryIds } }, { $pull: { products: id } });
      await CategoryModel.updateMany({ _id: { $in: categoryIds } }, { $push: { products: id } });
    }

    const result = await product.save();

    return result ? result : null;
  }

  async deleteProductById(id: string) {
    const resultProductDelete = await ProductModel.findByIdAndDelete(id);

    const updateCategoriesResult = await CategoryModel.updateMany(
      { _id: { $in: resultProductDelete?.categories } },
      { $pull: { products: id } }
    );

    return resultProductDelete && updateCategoriesResult ? true : false;
  }
}

export default ProductTypegooseRepository;
