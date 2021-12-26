import logger from '../../logger';
import { Request, Response, NextFunction } from 'express';

const generateLogMessage = (
  method: string,
  url: string,
  statusCode: number,
  requestBody: string,
  responseBody: string
) => {
  return `${method}:${url} ${statusCode}
  ReqBody: ${requestBody.length ? requestBody : '{}'}
  ResBody: ${responseBody.length ? responseBody : '{}'}
  `;
};

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;

  const reqBody = req.body;

  const originalSendFunc = res.json.bind(res);
  res.json = function (resBody) {
    const { statusCode } = res;
    logger.info(generateLogMessage(method, url, statusCode, JSON.stringify(reqBody), JSON.stringify(resBody)));
    return originalSendFunc(resBody);
  };
  next();
};
