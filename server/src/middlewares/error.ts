import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.error(err);
  res.json({
    message:"Internal Server Error",
  });
}