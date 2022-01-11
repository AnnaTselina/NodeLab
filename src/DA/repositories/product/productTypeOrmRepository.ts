import { IProductRepository, IProduct, IProductSearchParams } from '../../../types/types';
import { ProductEntity } from '../../postgresql/entities/product.entity';
import { parseProductQuerySearchParams } from '../../../helpers/productParamsParser';

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
}

export default ProductTypeOrmRepository;
