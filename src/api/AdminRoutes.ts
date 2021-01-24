import express from 'express';
import AdminServices from '../services/AdminServices';
import checkAdmin from '../middleware/checkAdmin';
import { Req } from 'types/types';

const router = express.Router();

router.use(checkAdmin);

router.get('/users', async (req: Req, res, next) => {
	try {
		const result = await AdminServices.getAllUsers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminServices.getOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminServices.deleteOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
