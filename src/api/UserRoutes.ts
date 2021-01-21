import express from 'express';
import auth from '../middleware/auth';
import UserService from '../services/UserService';

const router = express.Router();

router.get('/users', auth, async (req, res, next) => {
	try {
		const result = await UserService.getAll();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await UserService.getOne(id);
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.patch('/users/:id', async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await UserService.update(id, req.body);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', auth, async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await UserService.deleteOne(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
