import { NextFunction, Response } from 'express';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';
import { Req, UserType } from '../types/types';

const checkAdmin = async (
	req: Req,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		if (req.user!.__t === UserType.ADMIN) {
			next();
		} else {
			throw new UnauthorizedException('Not Authorized');
		}
	} catch (error) {
		next(error);
	}
};

export default checkAdmin;
