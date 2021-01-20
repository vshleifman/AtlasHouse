import express from 'express';
import AuthServices from '../services/AuthServices';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
	try {
		const result = await AuthServices.signup(req.body);
		res.status(201).send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/signin', async (req, res, next) => {
	try {
		const result = await AuthServices.signin(req.body.email, req.body.password);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
