import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Req } from 'types/types';
import { ProtoUserModel } from '../models/UserModel';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';

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
			const user = await ProtoUserModel.findOne({
				_id: decoded._id,
				'tokens.token': token,
			});
			if (!user) {
				throw new UnauthorizedException('Please authenticate');
			}

			req.token = token;
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
