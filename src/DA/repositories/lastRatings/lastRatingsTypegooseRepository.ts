import { LastRatingsModel } from '../../mongoDB/models/lastRatings.model';

class LastRatingsTypegooseRepository {
  async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const rate = await LastRatingsModel.create({ userId, productId, rating, comment, updatedAt: new Date() });
    const result = await rate.save();
    return result ? true : false;
  }

  async getLastTenRatings() {
    const result = await LastRatingsModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $limit: 10
      }
    ]);
    return result ? result : null;
  }

  async cleanRatings() {
    const leftRatings = await this.getLastTenRatings();
    if (leftRatings) {
      if (leftRatings.length >= 10) {
        const leftRatingsIds = leftRatings?.map((rating) => rating._id.toString());

        const result = await LastRatingsModel.deleteMany({
          _id: {
            $not: {
              $in: leftRatingsIds
            }
          }
        });
        return result ? true : false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}

export default LastRatingsTypegooseRepository;
