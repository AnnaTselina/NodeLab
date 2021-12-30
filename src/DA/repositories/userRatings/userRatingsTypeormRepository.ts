import { UserRatingsEntity } from '../../postgresql/entities/userRatings.entity';

class UserRatingsTypeormRepository {
  async addRating(userId: string, productId: string, rating: string) {
    const query = UserRatingsEntity.createQueryBuilder()
      .insert()
      .into('userRatings')
      .values({ userId, productId, rating });

    const result = await query.execute();

    return result ? true : false;
  }

  async updateRating(userId: string, productId: string, rating: string) {
    const userRating = await UserRatingsEntity.findOne({ where: { userId, productId } });
    if (userRating) {
      userRating.rating = rating;
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
}

export default UserRatingsTypeormRepository;
