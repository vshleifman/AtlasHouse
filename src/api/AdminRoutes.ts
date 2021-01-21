import express from 'express';
import AdminServices from 'services/AdminServices';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/users', auth, async (req, res, next) => {
	try {
		const result = await AdminServices.getAllUsers();
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/users/:id', auth, async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminServices.getOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.delete('/users/:id', auth, async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await AdminServices.deleteOneUser(id);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});
