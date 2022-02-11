import { LastRatingsRepository } from '../DA/DBManager';

export class LastRatingsService {
  public async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const result = await LastRatingsRepository.addRating(userId, productId, rating, comment);
    return result;
  }

  public async getLastTenRatings() {
    const result = await LastRatingsRepository.getLastTenRatings();
    return result;
  }
}
