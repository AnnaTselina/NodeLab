import ProductModel from '../../mongoDB/models/product.model';
import { IProduct, IProductSearchParams } from '../../../types/types';
import { parseProductQueryParamsMongo } from '../../../helpers/productParamsParser';

class ProductTypegooseRepository {
  async getProducts(queryParams: IProductSearchParams): Promise<IProduct[]> {
    const { filterParams, sortingParams, skipParam } = parseProductQueryParamsMongo(queryParams);
    const pageSize = Number(process.env['PAGE_SIZE']);

    const data = await ProductModel.find(filterParams).skip(skipParam).limit(pageSize).sort(sortingParams);
    return data;
  }
}

export default ProductTypegooseRepository;
