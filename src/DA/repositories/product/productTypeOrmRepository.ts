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
}

export default ProductTypeOrmRepository;
