import { Response, NextFunction, Request } from 'express';
import {
	BadRequestException,
	NotFoundException,
	ServerException,
	UnauthorizedException,
} from '../services/exceptions/MyExceptions';

export enum ApiError {
	NotFound = 'NotFound',
	Unauthorized = 'Unauthorized',
	BadRequest = 'BadRequest',
	ServerError = 'ServerError',
}

export const sendError = (
	res: Response,
	httpCode: number,
	code: ApiError,
	msg: string,
	target?: string,
): void => {
	res.status(httpCode).json({ code, msg, target });
};

const exceptionHandler = (
	error: Error,
	_: Request,
	res: Response,
	next: NextFunction,
): void => {
	if (error instanceof NotFoundException) {
		sendError(res, 404, ApiError.NotFound, error.message);
	}

	if (error instanceof UnauthorizedException) {
		sendError(res, 401, ApiError.Unauthorized, error.message);
	}

	if (error instanceof ServerException) {
		sendError(res, 500, ApiError.ServerError, error.message);
	}

	if (error instanceof BadRequestException) {
		console.log(error.message);

		sendError(res, 400, ApiError.BadRequest, error.message);
	}

	next();
};

export default exceptionHandler;
