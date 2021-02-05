import express from 'express';
import { Req } from '../types/types';
import auth from '../middleware/auth';
import UserServices from '../services/UserServices';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';

const router = express.Router();

router.use(auth);

router.get('/users/me', async (req: Req, res, next) => {
	try {
		if (req.user) {
			res.send(req.user);
		} else {
			throw new UnauthorizedException();
		}
	} catch (error) {
		next(error);
	}
});

router.patch('/users/:id', async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await UserServices.update(id, req.body);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await UserServices.deleteOne(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
