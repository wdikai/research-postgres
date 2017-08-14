import { ErrorMiddlewareInterface, MiddlewareGlobalAfter } from "routing-controllers";
import { Request, Response } from "express";

import { HttpError } from '../utils/httpError';

const environment: string = process.env.NODE_ENV || 'dev';

@MiddlewareGlobalAfter()
export class ErrorHandlerMiddleware implements ErrorMiddlewareInterface {

    public error(error: any, request: Request, response: Response, next: Function) {
        if (environment === 'dev') {
            console.error('Error:', error.message);
            console.error('Error Stack:', error.stack);
        }
        
        if(!(error instanceof HttpError)){
            error = new HttpError(error.message, 500);
        }

        response
            .status(error.status)
            .json(error.toJSON());

        next();
    }

}