import ProductModel from '../../mongoDB/models/product.model';
import { IProduct, IProductSearchParams } from '../../../types/types';
import { parseProductQueryParamsMongo } from '../../../helpers/productParamsParser';

class ProductTypegooseRepository {
  async getProducts(queryParams: IProductSearchParams): Promise<IProduct[]> {
    const { filterParams, sortingParams } = parseProductQueryParamsMongo(queryParams);

    const data = await ProductModel.find(filterParams).sort(sortingParams);
    return data;
  }
}

export default ProductTypegooseRepository;
