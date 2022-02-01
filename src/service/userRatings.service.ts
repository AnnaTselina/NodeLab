import { UserRatingsRepository } from '../DA/DBManager';
import HttpException from '../exceptions/exceptions';
import { ProductsService } from './products.service';

const productService = new ProductsService();

export class UserRatingsService {
  public async rateProduct(userId: string, productId: string, rating: number, comment?: string) {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new HttpException(404, `Product with id=${productId} not found.`);
    }

    const existingUserRating = await UserRatingsRepository.getUserRatingByProductId(userId, productId);

    const putUserRating = existingUserRating
      ? await UserRatingsRepository.updateRating(userId, productId, rating, comment)
      : await UserRatingsRepository.addRating(userId, productId, rating, comment);

    const newProductTotalRating = await UserRatingsRepository.countAverageProductRating(productId);
    let updateProductTotalRating;
    if (newProductTotalRating) {
      updateProductTotalRating = await productService.updateProductTotalRating(productId, newProductTotalRating);
    } else {
      throw new HttpException(500, 'An error occured getting total product rating.');
    }
    return putUserRating && updateProductTotalRating;
  }

  public async getLastTenRatings() {
    const result = await UserRatingsRepository.getLastTenRatings();
    return result;
  }
}
