import jwt from 'jsonwebtoken';

const refreshTokensList: { [key: string]: string } = {};

export const generateAccessToken = (username: string) => {
  if (process.env['ACCESS_TOKEN_SECRET']) {
    const accessToken = jwt.sign({ username }, process.env['ACCESS_TOKEN_SECRET'], { expiresIn: '30m' });
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

export const verifyRefreshToken = (token: string) => {
  if (!process.env['REFRESH_TOKEN_SECRET']) {
    return null;
  } else {
    try {
      const verificateTokenResult = jwt.verify(token, process.env['REFRESH_TOKEN_SECRET']);
      //verify() return string (with error) if verification failed and jwt.JwtPayload if successful
      return !!refreshTokensList[token] && (typeof verificateTokenResult === 'string' ? false : verificateTokenResult);
    } catch (err) {
      return false;
    }
  }
};

export const deauthenticateRefreshToken = (token: string) => {
  if (refreshTokensList[token]) {
    delete refreshTokensList[token];
    return true;
  } else {
    return false;
  }
};

export const verifyAccessToken = (token: string) => {
  if (!process.env['ACCESS_TOKEN_SECRET']) {
    return null;
  } else {
    try {
      const verifResult = jwt.verify(token, process.env['ACCESS_TOKEN_SECRET']);

      return typeof verifResult === 'string' ? false : verifResult;
    } catch (err) {
      return false;
    }
  }
};
