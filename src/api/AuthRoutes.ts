import express from 'express';
import auth from '../middleware/auth';
import { Req } from 'types/types';
import AuthServices from '../services/AuthServices';
import { User } from 'models/UserModel';

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

router.post('/signout', auth, async (req: Req, res, next) => {
	try {
		await AuthServices.signout(req.user!, req.token!);
		res.status(200).send('Signed out!');
	} catch (error) {
		next(error);
	}
});

router.post('/signoutAll', auth, async (req: Req, res, next) => {
	try {
		AuthServices.signoutAll(req.user!);
		res.status(200).send('Signed out!');
	} catch (error) {
		next(error);
	}
});

export default router;
