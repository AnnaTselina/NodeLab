import { ProductRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import { IProduct } from '../types/types';

const checkProductIdsValid = async (productIdsToCheck: string[], products?: IProduct[]) => {
  let productsExist;
  if (!products) {
    productsExist = await ProductRepository.getProductsByIds(productIdsToCheck);
  } else {
    productsExist = products;
  }

  if (!productsExist) {
    throw new HttpException(500, 'An error ocured trying to get products.');
  }
  let productIdsFound = productsExist.map((product) => {
    if (process.env['DB'] === 'mongo') {
      return product._id?.toString();
    } else {
      return product._id;
    }
  });

  const productIdsNotExist = productIdsToCheck.filter((id) => !productIdsFound?.includes(id));

  if (productIdsNotExist.length) {
    throw new HttpException(404, `Products with ids: '${productIdsNotExist.join(',')}' do not exist.`);
  }
};

export default checkProductIdsValid;
