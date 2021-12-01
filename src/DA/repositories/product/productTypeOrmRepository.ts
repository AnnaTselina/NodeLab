import { IProductRepository, IProduct, IProductSearchParams } from '../../../types/types';
import { ProductEntity } from '../../postgresql/entities/product.entity';
import { parseProductQueryParamsPostgres } from '../../../helpers/productParamsParser';

class ProductTypeOrmRepository implements IProductRepository {
  async getProducts(queryParams: IProductSearchParams): Promise<IProduct[]> {
    const { filterParams, sortingParams } = parseProductQueryParamsPostgres(queryParams);
    const data = await ProductEntity.find({
      where: filterParams,
      order: sortingParams
    });
    return data;
  }
}

export default ProductTypeOrmRepository;
