import { Response } from 'express';
import {
	BadRequestException,
	NotFoundException,
	ServerException,
	UnauthorizedException,
} from '../services/exceptions/MyError';

enum ApiError {
	NotFound = 'NotFound',
	Unauthorized = 'Unauthorized',
	BadRequest = 'BadRequest',
	ServerError = 'ServerError',
}

const sendError = (
	res: Response,
	httpCode: number,
	code: ApiError,
	msg: string,
	target?: string,
) => {
	res.status(httpCode).json({ code, msg, target });
};

const exceptionHandler = (error: Error, req: Request, res: Response): void => {
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
		sendError(res, 400, ApiError.BadRequest, error.message);
	}
};

export default exceptionHandler;
