class UserRatingsTypegooseRepository {
  async addRating(userId: string, productId: string, rating: string) {
    return false;
  }

  async getUserRatingByProductId(userId: string, productId: string) {
    return null;
  }

  async updateRating(userId: string, productId: string, rating: string) {
    return false;
  }

  async countAverageProductRating(productId: string) {
    return null;
  }
}

export default UserRatingsTypegooseRepository;
