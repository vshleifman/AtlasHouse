import express from 'express';
import { Req } from '../types/types';
import auth from '../middleware/auth';
import UserServices from '../services/UserServices';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';
import { mongoose } from '@typegoose/typegoose';

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

router.patch('/users/:id', async (req, res, next) => {
	const id = (req.params.id as unknown) as mongoose.Types.ObjectId;

	try {
		const result = await UserServices.update(id, req.body);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/me', async (req: Req, res, next) => {
	const id = (req.user!._id as unknown) as string;

	try {
		const result = await UserServices.deleteOne(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
