import { ProductModel } from '../../mongoDB/models/product.model';
import { IProductSearchParams, IProduct } from '../../../types/types';
import { parseProductQuerySearchParams } from '../../../helpers/productParamsParser';

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
    return false;
  }
}

export default ProductTypegooseRepository;
