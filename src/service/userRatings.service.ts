import { UserRatingsRepository } from '../DA/DBManager';

export class UserRatingsService {
  public async addRating(userId: string, productId: string, rating: string) {
    const data = await UserRatingsRepository.addRating(userId, productId, rating);
    return data;
  }
}
