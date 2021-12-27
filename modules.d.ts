import { Jwt } from 'jsonwebtoken';
import expres from 'express';

declare namespace NodeJS {
  export interface ProcessEnv {
    MONGODB_CONNECTION: string;
  }
}

declare module 'express' {
  export interface Request {
    user?: Jwt.payload;
  }
}
