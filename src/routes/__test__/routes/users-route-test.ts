import request from 'supertest';
import app from '../../..';
import * as mockData from '../mockData.json';

const testUsersRoutes = () => {
  describe('POST /register :', () => {
    test('return 201 status for newly created user', async () => {
      const { statusCode } = await request(app).post('/register').send(mockData.userValidData);
      expect(statusCode).toBe(201);
    });

    test('return 400 if username already exists', async () => {
      const { statusCode } = await request(app).post('/register').send(mockData.userValidData);
      expect(statusCode).toBe(400);
    });

    test('expect to return error message in case of invalid password', async () => {
      const { body } = await request(app).post('/register').send(mockData.userWithInvalidPassword);
      expect(body).toHaveProperty('errorMessage');
    });
  });

  describe('POST /authenticate :', () => {
    test('return access and refresh token for existing user', async () => {
      const { body } = await request(app).post('/authenticate').send(mockData.userValidData);
      expect(body).toHaveProperty('accessToken');
      expect(body).toHaveProperty('refreshToken');
    });

    test('return 404 status and appropriate error message for non-existent user', async () => {
      const { statusCode, body } = await request(app).post('/authenticate').send(mockData.userWithIncorrectUserName);
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('errorMessage', 'User with provided username does not exist.');
    });

    test('return 400 status and appropriate error message if password does not match', async () => {
      const { statusCode, body } = await request(app).post('/authenticate').send(mockData.userWithIncorrectPassword);
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('errorMessage', 'Incorrect password.');
    });
  });
};

export default testUsersRoutes;
