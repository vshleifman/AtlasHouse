import express from 'express';
import { Req } from '../types/types';
import auth from '../middleware/auth';
import UserService from '../services/UserService';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';

const router = express.Router();

router.use(auth);

router.get('/users/me', async (req: Req, res, next) => {
	try {
		if (req.user) {
			const result = await req.user.populate('bookings').execPopulate();
			res.status(200).send(result);
		} else {
			throw new UnauthorizedException();
		}
	} catch (error) {
		next(error);
	}
});

router.patch('/users/me', async (req: Req, res, next) => {
	try {
		if (req.user) {
			const result = await UserService.update(req.user._id, req.body);
			res.status(200).send(result);
		} else {
			throw new UnauthorizedException();
		}
	} catch (error) {
		next(error);
	}
});

router.delete('/users/me', async (req: Req, res, next) => {
	const id = req.user!._id;

	try {
		const result = await UserService.deleteOne(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
