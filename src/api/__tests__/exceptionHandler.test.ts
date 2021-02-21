import exceptionHandler from '../../api/exceptionHandler';
import {
	BadRequestException,
	NotFoundException,
	ServerException,
	UnauthorizedException,
} from '../../services/exceptions/MyExceptions';
import { ApiError } from '../exceptionHandler';
import { buildNext, buildReq, buildRes } from '../../tests/utils/generate';

describe('exception handler responds to errors correctly', () => {
	const req = buildReq({});

	const res = buildRes();

	const next = buildNext();

	const errors = [
		{
			status: 401,
			errorMsg: 'Error: Unauthorized',
			apiCode: ApiError.Unauthorized,
			exception: UnauthorizedException,
		},
		{
			status: 404,
			errorMsg: 'Error: Not Found',
			apiCode: ApiError.NotFound,
			exception: NotFoundException,
		},
		{
			status: 500,
			errorMsg: 'Error: Server Issues',
			apiCode: ApiError.ServerError,
			exception: ServerException,
		},
		{
			status: 400,
			errorMsg: 'Error: Bad Request',
			apiCode: ApiError.BadRequest,
			exception: BadRequestException,
		},
	];

	beforeEach(() => jest.clearAllMocks());
	for (let i = 0; i < errors.length; i++) {
		const error = new errors[i].exception(errors[i].errorMsg);
		test('error responds with correct data', () => {
			exceptionHandler(error, req, res, next);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(errors[i].status);
			expect(res.json).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				code: errors[i].apiCode,
				msg: errors[i].errorMsg,
			});
		});
	}
});
