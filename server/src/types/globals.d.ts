import 'express';
/// <reference types="@clerk/express/env" />


declare module 'express-serve-static-core' {
  interface Request {
    auth?: {
      userId: string;
      [key: string]: any;
    };
  }
}