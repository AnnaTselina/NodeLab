import { UserRatingsRepository } from '../DA/DBManager';

export class UserRatingsService {
  public async addRating(userId: string, productId: string, rating: string, comment?: string) {
    const data = await UserRatingsRepository.addRating(userId, productId, rating, comment);
    return data;
  }
  public async getUserRatingByProductId(userId: string, productId: string) {
    const data = await UserRatingsRepository.getUserRatingByProductId(userId, productId);
    return data;
  }

  public async updateRating(userId: string, productId: string, rating: string, comment?: string) {
    const data = await UserRatingsRepository.updateRating(userId, productId, rating, comment);
    return data;
  }

  public async countAverageProductRating(productId: string) {
    const data = await UserRatingsRepository.countAverageProductRating(productId);
    return data;
  }
}
