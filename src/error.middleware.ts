import { NextFunction, Request, Response } from 'express';
 
function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const status = 500;
  const message = error.message || 'Something went wrong';

    response.status(status).send({
      status,
      message,
    })
}
 
export default errorMiddleware;