import { LastRatingsEntity } from '../../postgresql/entities/lastRatings.entity';

class LastRatingsTypeormRepository {
  async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const query = LastRatingsEntity.createQueryBuilder()
      .insert()
      .into('lastratings')
      .values({ userId, productId, rating, comment, updatedAt: new Date() });
    const result = await query.execute();
    return result ? true : false;
  }
}

export default LastRatingsTypeormRepository;
