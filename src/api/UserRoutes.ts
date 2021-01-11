import express from 'express';
import {
	createUser,
	fetchUser,
	fetchUsers,
	updateUser,
} from '../services/UserService';
// import User from '../models/UserModel';

const router = express.Router();

router.post('/users', async (req, res) => {
	const result = await createUser(req.body);

	if (result.email) {
		res.status(201).send(result);
	} else {
		res.status(400).send(result);
	}
});

router.get('/users', async (req, res) => {
	const result = await fetchUsers();

	if (result.length) {
		res.status(200).send(result);
	} else {
		res.status(500).send(result);
	}
});

router.get('/users/:id', async (req, res) => {
	const id = req.params.id;
	const result = await fetchUser(id);

	if (result?.email) {
		res.status(200).send(result);
	} else {
		res.status(404).send('User not found');
	}
});

router.patch('/users/:id', async (req, res) => {
	const id = req.params.id;
	const result = await updateUser(id, req.body);

	if (typeof result === 'string') {
		res.send({ error: result });
	} else {
		res.status(200).send(result);
	}
});

export default router;
