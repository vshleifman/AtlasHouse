import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../models/UserModel';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';

export interface Req extends Request {
	user?: User;
}
const auth = async (
	req: Req,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) {
			throw new UnauthorizedException('Please authenticate');
		}
		try {
			const decoded = jwt.verify(token, 'some.string') as { _id: string };
			const user = await UserModel.findOne({
				_id: decoded._id,
				'tokens.token': token,
			});
			if (!user) {
				throw new UnauthorizedException('Please authenticate');
			}

			req.user = user;
		} catch (error) {
			if (error.message === 'invalid token') {
				throw new UnauthorizedException('Please authenticate');
			}
			throw error;
		}
		next();
	} catch (error) {
		next(error);
	}
};

export default auth;
