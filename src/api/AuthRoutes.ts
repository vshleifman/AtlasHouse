import express from 'express';
import { signup, signin } from '../services/AuthServices';

const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const result = await signup(req.body);
		res.status(201).send(result);
	} catch (error) {
		res.status(error.code).send(error.msg);
	}
});

router.post('/signin', async (req, res) => {
	try {
		const result = await signin(req.body.email, req.body.password);
		res.status(200).send(result);
	} catch (error) {
		res.status(error.code).send(error.msg);
	}
});

export default router;
