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

  async getLastTenRatings() {
    const result = await LastRatingsEntity.find({ order: { _id: 'DESC' }, take: 10 });
    return result ? result : null;
  }

  async cleanRatings() {
    const leftRatings = await this.getLastTenRatings();
    if (leftRatings) {
      if (leftRatings.length >= 10) {
        const leftRatingsIds = leftRatings?.map((rating) => rating._id);

        const result = await LastRatingsEntity.createQueryBuilder()
          .delete()
          .from('lastratings')
          .where('lastratings._id NOT IN (:...leftRatingsIds)', { leftRatingsIds: leftRatingsIds })
          .execute();

        return result ? true : false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}

export default LastRatingsTypeormRepository;
