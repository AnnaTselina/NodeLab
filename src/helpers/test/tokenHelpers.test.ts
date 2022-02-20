import { generateAccessToken, verifyAccessToken } from '../tokenHelpers';
import dotenv from 'dotenv';
dotenv.config();

const TEST_USERNAME = 'test@test.com';
const TEST_USER_ID = 1;
const EXPIRED_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJfaWQiOjEsImlhdCI6MTY0NDc1NDM1NSwiZXhwIjoxNjQ0NzU2MTU1fQ.Bcd-88w9CDcTVqCFwnCzQCIUqNxlS64w3SHzwKDHaVQ';

describe('Verify access token function: ', () => {
  test('should return proper username and _id', () => {
    const accesToken = generateAccessToken(TEST_USERNAME, TEST_USER_ID);

    if (accesToken) {
      expect(verifyAccessToken(accesToken)).toMatchObject({ username: TEST_USERNAME, _id: TEST_USER_ID });
    } else {
      throw new Error('Failed to get access token.');
    }
  });

  test('should return false if token expired', () => {
    expect(verifyAccessToken(EXPIRED_TOKEN)).toBeFalsy();
  });
});
