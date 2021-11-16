import { IProductRepository, IProduct } from '../../../types/types';
import { ProductEntity } from '../../postgresql/entities/product.entity';

class ProductTypeOrmRepository implements IProductRepository {
  async getProducts(): Promise<IProduct[]> {
    const data = await ProductEntity.find();
    return data;
  }
}

export default ProductTypeOrmRepository;
