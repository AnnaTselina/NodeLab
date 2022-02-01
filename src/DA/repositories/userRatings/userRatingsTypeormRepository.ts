import { UserRatingsEntity } from '../../postgresql/entities/userRatings.entity';
import { getManager } from 'typeorm';

class UserRatingsTypeormRepository {
  async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const query = UserRatingsEntity.createQueryBuilder()
      .insert()
      .into('userratings')
      .values({ userId, productId, rating, comment, updatedAt: new Date() });

    const result = await query.execute();

    return result ? true : false;
  }

  async updateRating(userId: string, productId: string, rating: number, comment?: string) {
    const userRating = await UserRatingsEntity.findOne({ where: { userId, productId } });

    if (userRating) {
      userRating.rating = rating;
      userRating.updatedAt = new Date();
      if (comment) {
        userRating.comment = comment;
      }
      const result = await userRating.save();
      return result ? true : false;
    } else {
      return false;
    }
  }

  async getUserRatingByProductId(userId: string, productId: string) {
    const result = await UserRatingsEntity.findOne({
      where: { userId, productId }
    });

    return result ? result : null;
  }

  async countAverageProductRating(productId: string) {
    const entityManager = getManager();
    const average = await entityManager.query(`select AVG(rating) from userratings WHERE "productId"='${productId}'`);
    return average ? Number(average[0].avg) : null;
  }

  async getLastTenRatings() {
    const result = await UserRatingsEntity.find({ select: ['userId', 'rating', 'comment', 'updatedAt'] });
    return result ? result : null;
  }
}

export default UserRatingsTypeormRepository;
