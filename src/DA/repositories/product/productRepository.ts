import ProductTypegooseRepository from './productsTypegooseRepository';
import ProductTypeOrmRepository from './productTypeOrmRepository';

const getProductRepository = () => {
  if (process.env['DB'] === 'mongo') {
    return new ProductTypegooseRepository();
  } else {
    return new ProductTypeOrmRepository();
  }
};

export default getProductRepository;
