import { IProductRepository, IProduct } from '../../../types/types';

class ProductTypeOrmRepository implements IProductRepository {
  async getProducts(): Promise<IProduct[]> {
    return [];
  }
}

export default ProductTypeOrmRepository;
