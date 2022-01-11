import { ProductRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';

const checkProductIdsValid = async (productIds: string[]) => {
  const productsExist = await ProductRepository.getProductsByIds(productIds);
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

  const productIdsNotExist = productIds.filter((id) => !productIdsFound?.includes(id));
  return productIdsNotExist;
};

export default checkProductIdsValid;
