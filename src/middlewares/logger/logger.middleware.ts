import logger from '../../logger';
import { Request, Response, NextFunction } from 'express';

const getReqBody = async (req: Request) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};

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

  const reqBody = await getReqBody(req);

  const originalSendFunc = res.json.bind(res);
  res.json = function (resBody) {
    const { statusCode } = res;
    logger.info(generateLogMessage(method, url, statusCode, reqBody, JSON.stringify(resBody)));
    return originalSendFunc(resBody);
  };
  next();
};
