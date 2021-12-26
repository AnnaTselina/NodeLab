import jwt from 'jsonwebtoken';

const refreshTokensList: { [key: string]: string } = {};

export const generateAccessToken = (username: string) => {
  if (process.env['ACCESS_TOKEN_SECRET']) {
    const accessToken = jwt.sign({ username }, process.env['ACCESS_TOKEN_SECRET'], { expiresIn: '10m' });
    return accessToken;
  } else {
    return null;
  }
};

export const generateRefreshToken = (username: string) => {
  if (process.env['REFRESH_TOKEN_SECRET']) {
    const refreshToken = jwt.sign({ username }, process.env['REFRESH_TOKEN_SECRET']);
    refreshTokensList[refreshToken] = username;
    return refreshToken;
  } else {
    return null;
  }
};
