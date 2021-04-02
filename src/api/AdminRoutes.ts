import express from 'express';
import AdminService from '../services/AdminService';
import checkAdmin from '../middleware/checkAdmin';
import { PartialSchemaClassIntersection, QueryOptions, Req } from 'types/types';
import extractQuery from './extractQuery';
import { UserModel } from '../models/UserModel';

const router = express.Router();

router.use(checkAdmin);

router.get('/users', async (req: Req, res, next) => {
	const { match, options } = extractQuery(
		UserModel,
		req.query as Record<
			string,
			keyof PartialSchemaClassIntersection & keyof QueryOptions
		>,
	);
	try {
		const result = await AdminService.getAllUsers(match, options);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminService.getOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminService.deleteOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
