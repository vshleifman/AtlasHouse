import express from 'express';
import auth from '../middleware/auth';
import { Req } from 'types/types';
import AuthService from '../services/AuthService';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
	try {
		const result = await AuthService.signup(req.body);
		res.status(201).send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/signin', async (req, res, next) => {
	try {
		console.log({ req });

		const result = await AuthService.signin(req.body.email, req.body.password);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/signout', auth, async (req: Req, res, next) => {
	try {
		await AuthService.signout(req.user!, req.token!);
		res.status(200).send('Signed out!');
	} catch (error) {
		next(error);
	}
});

router.post('/signoutAll', auth, async (req: Req, res, next) => {
	try {
		AuthService.signoutAll(req.user!);
		res.status(200).send('Signed out!');
	} catch (error) {
		next(error);
	}
});

export default router;
