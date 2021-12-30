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
}

export default UserRatingsTypeormRepository;
