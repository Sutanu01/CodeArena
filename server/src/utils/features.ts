import { Request, Response, NextFunction } from "express";

type TryCatchFunction = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => void;

export const TryCatch: TryCatchFunction = (passedFunc) => {
  return async (req, res, next) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const sendResponse = (
  status: number,
  success: boolean,
  message: string,
  res: Response,
  extraData?: any
) => {
  return res.status(status).json({
    success,
    message,
    ...(extraData && { data: extraData }),
  });
};

