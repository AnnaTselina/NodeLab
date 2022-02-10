import { IProductRepository, IProduct, IProductSearchParams } from '../../../types/types';
import { ProductEntity } from '../../postgresql/entities/product.entity';
import { parseProductQuerySearchParams } from '../../../helpers/productParamsParser';
import { CategoryEntity } from '../../postgresql/entities/category.entity';
import checkCategoryIdsValid from '../../../helpers/categoryIdsValidation';
import HttpException from '../../../exceptions/exceptions';

class ProductTypeOrmRepository implements IProductRepository {
  async getProducts(queryParams: IProductSearchParams): Promise<IProduct[]> {
    const { filterParams, sortingParams, skipParam } = parseProductQuerySearchParams<false>(queryParams);
    const pageSize = Number(process.env['PAGE_SIZE']);
    const data = await ProductEntity.find({
      where: filterParams,
      order: sortingParams,
      skip: skipParam,
      take: pageSize
    });
    return data;
  }

  async getProductById(id: string) {
    const data = await ProductEntity.findOne(id);
    return data ? data : null;
  }

  async updateProductTotalRating(id: string, newRating: number) {
    const data = await ProductEntity.createQueryBuilder()
      .update('product')
      .set({ totalRating: newRating })
      .where({ _id: id })
      .execute();
    return data ? true : false;
  }

  async getProductsByIds(productsIds: string[]) {
    const data = await ProductEntity.createQueryBuilder('product')
      .where('product._id IN (:...productsIds)', { productsIds: productsIds })
      .getMany();
    return data ? data : null;
  }

  async getProductByName(displayName: string) {
    const data = await ProductEntity.findOne({ where: { displayName } });
    return data ? data : null;
  }

  async createNewProduct(displayName: string, categoryIds: string[], price: number) {
    const categories = await CategoryEntity.createQueryBuilder('category')
      .where('category._id IN (:...categoryIds)', {
        categoryIds
      })
      .getMany();

    await checkCategoryIdsValid(categoryIds, categories);

    const newProduct = new ProductEntity();
    newProduct.displayName = displayName;
    newProduct.price = price;
    newProduct.createdAt = new Date();
    newProduct.categories = categories;
    const data = await newProduct.save();

    return data ? data : null;
  }

  async updateProductInfo(id: string, displayName?: string, categoryIds?: string[], price?: number) {
    const product = await ProductEntity.findOne(id);
    let result;
    if (product) {
      if (displayName) {
        product.displayName = displayName;
      }
      if (price) {
        product.price = price;
      }
      if (categoryIds) {
        const categories = await CategoryEntity.createQueryBuilder('category')
          .where('category._id IN (:...categoryIds)', {
            categoryIds
          })
          .getMany();
        await checkCategoryIdsValid(categoryIds, categories);
        product.categories = categories;
      }

      result = await product.save();
    } else {
      throw new HttpException(404, `Product with id=${id} not found.`);
    }

    return result ? result : null;
  }

  async deleteProductById(id: string) {
    const product = await ProductEntity.findOne(id);
    const result = await product?.remove();

    return result ? true : false;
  }
}

export default ProductTypeOrmRepository;
