import request from 'supertest';
import app from '../../..';
import * as mockData from '../mockData.json';
import { LastRatingsRepository, ProductRepository } from '../../../DA/DBManager';
import { IProduct } from '../../../types/types';
import { mongoose } from '@typegoose/typegoose';

const testProductRoutes = () => {
  describe('GET /products', () => {
    test('return 404 and corresponding error message if no products returned', async () => {
      const { statusCode, body } = await request(app).get('/products');
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('errorMessage', 'Product(s) not found.');
    });

    describe('with inserted products: ', () => {
      let products;
      beforeAll(async () => {
        products = await Promise.all(
          mockData.testingProducts.map((product) => {
            const createdProduct = ProductRepository.createNewProduct(
              product.displayName,
              product.categories,
              product.price
            );
            return createdProduct;
          })
        );
      });

      test('return 200 status if products array not empty', async () => {
        const { statusCode } = await request(app).get('/products');
        expect(statusCode).toBe(200);
      });

      test('all product return with no specified additional parameters', async () => {
        const { body } = await request(app).get('/products');
        expect(body.results).toHaveLength(products.length);
      });

      test('return corresponding products with specified price range', async () => {
        const { body } = await request(app).get('/products?price=90:');

        expect(body.results.every((product: IProduct) => product.price >= 90)).toBe(true);
      });

      test('return 400 status and error message with incorrect price parameter specified', async () => {
        const { statusCode, body } = await request(app).get('/products?price=x:y');

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('errorMessage');
      });
    });
  });

  describe('GET /lastRatings', () => {
    beforeAll(async () => {
      const newRatings = [];
      for (let i = 0; i < 15; i++) {
        newRatings.push({
          userId: new mongoose.Types.ObjectId().toString(),
          productId: new mongoose.Types.ObjectId().toString(),
          rating: 7
        });
      }

      await Promise.all(
        newRatings.map((rating) => {
          return LastRatingsRepository.addRating(rating.userId, rating.productId, rating.rating);
        })
      );
    });

    test('return 10 ratings', async () => {
      const { statusCode, body } = await request(app).get('/lastRatings');
      expect(statusCode).toBe(200);
      expect(body.result).toHaveLength(10);
    });
  });
};

export default testProductRoutes;
