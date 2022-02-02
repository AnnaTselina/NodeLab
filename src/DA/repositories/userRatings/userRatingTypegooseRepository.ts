import { ProductModel } from '../../mongoDB/models/product.model';
import mongoose from 'mongoose';

class UserRatingsTypegooseRepository {
  async addRating(userId: string, productId: string, rating: number, comment?: string) {
    const data = await ProductModel.findByIdAndUpdate(
      {
        _id: productId
      },
      {
        $push: {
          ratings: { userId, rating: rating, comment: comment || '', updatedAt: new Date() }
        }
      }
    );
    return data ? true : false;
  }

  async getUserRatingByProductId(userId: string, productId: string) {
    const data = await ProductModel.findOne(
      {
        _id: productId,
        ratings: {
          $elemMatch: {
            userId: userId
          }
        }
      },
      {
        ratings: {
          $elemMatch: {
            userId: userId
          }
        }
      }
    );
    return data ? data.ratings[0] : null;
  }

  async updateRating(userId: string, productId: string, rating: number, comment?: string) {
    const updateBlock: { 'ratings.$.rating': number; 'ratings.$.comment'?: string; 'ratings.$.updatedAt': Date } = {
      'ratings.$.rating': rating,
      'ratings.$.updatedAt': new Date()
    };

    if (comment) {
      updateBlock['ratings.$.comment'] = comment;
    }
    const data = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
        ratings: {
          $elemMatch: {
            userId: userId
          }
        }
      },
      {
        $set: updateBlock
      }
    );
    return data ? true : false;
  }

  async countAverageProductRating(productId: string) {
    const data = await ProductModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
      { $project: { average: { $round: [{ $avg: '$ratings.rating' }, 2] } } }
    ]);
    return data[0] && data[0].average ? data[0].average : null;
  }

  async getLastTenRatings() {
    const data = await ProductModel.aggregate([
      { $match: { ratings: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: '$ratings' },
      { $replaceRoot: { newRoot: '$ratings' } },
      { $sort: { updatedAt: -1 } },
      { $limit: 10 }
    ]);

    return data ? data : null;
  }
}

export default UserRatingsTypegooseRepository;
