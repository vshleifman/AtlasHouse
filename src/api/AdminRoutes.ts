import express from 'express';
import AdminServices from '../services/AdminServices';
import auth from '../middleware/auth';
import checkAdmin from '../middleware/checkAdmin';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';
import { Req, UserType } from 'types/types';

const router = express.Router();

// router.use(checkAdmin);

router.get('/users', auth, async (req: Req, res, next) => {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const result = await AdminServices.getAllUsers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', auth, async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const result = await AdminServices.getOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/users/:id', auth, async (req: Req, res, next) => {
	const id = req.params.id;

	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const result = await AdminServices.deleteOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
