import { Jwt } from 'jsonwebtoken';
import expres from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_CONNECTION: string;
      WEBSOCKET_PORT: number;
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: Jwt.payload;
  }
}
