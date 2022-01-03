import { ObjectId } from '../../../types/types';
import { ProductModel } from '../../mongoDB/models/product.model';
import mongoose from 'mongoose';

class UserRatingsTypegooseRepository {
  async addRating(userId: string, productId: string, rating: string) {
    const data = await ProductModel.findByIdAndUpdate(
      {
        _id: productId
      },
      {
        $push: {
          ratings: { userId, rating, comment: '' }
        }
      }
    );
    return data ? true : false;
  }

  async getUserRatingByProductId(
    userId: string,
    productId: string
  ): Promise<{ userId: ObjectId; rating: number; comment?: string } | null> {
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

  async updateRating(userId: string, productId: string, rating: string) {
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
        $set: {
          'ratings.$.rating': rating
        }
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
}

export default UserRatingsTypegooseRepository;
