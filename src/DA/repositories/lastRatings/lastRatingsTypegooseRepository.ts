import { LastRatingsModel } from '../../mongoDB/models/lastRatings.model';

class LastRatingsTypegooseRepository {
  async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const rate = await LastRatingsModel.create({ userId, productId, rating, comment, updatedAt: new Date() });
    const result = await rate.save();
    return result ? true : false;
  }
}

export default LastRatingsTypegooseRepository;
