import { ProductModel } from '../../mongoDB/models/product.model';
import { IProductSearchParams } from '../../../types/types';
import { parseProductQueryParamsMongo } from '../../../helpers/productParamsParser';

class ProductTypegooseRepository {
  async getProducts(queryParams: IProductSearchParams) {
    const { filterParams, sortingParams, skipParam } = parseProductQueryParamsMongo(queryParams);
    const pageSize = Number(process.env['PAGE_SIZE']);

    const data = await ProductModel.find(filterParams).skip(skipParam).limit(pageSize).sort(sortingParams);
    return data;
  }
}

export default ProductTypegooseRepository;
