import express from 'express';
import { NotFoundException } from '../services/exceptions/MyError';
import {
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from '../services/UserService';

const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const result = await getUsers();
		res.status(200).send(result);
	} catch (error) {
		res.status(error.code).send(error.msg);
	}
});

// router.get('/users/:id', async (req, res) => {
// 	const id = req.params.id;

// 	try {
// 		const result = await getUser(id);
// 		res.status(200).send(result);
// 	} catch (error) {
// 		res.status(error.code).send(error.msg);
// 	}
// });

// router.patch('/users/:id', async (req, res) => {
// 	const id = req.params.id;

// 	try {
// 		const result = await updateUser(id, req.body);
// 		res.status(200).send(result);
// 	} catch (error) {
// 		if (error instanceof NotFoundException) {
// 			res.status(error.code).send(error.msg);
// 		}

// 		res.status(500).send({ error });
// 	}
// });

// router.delete('/users/:id', async (req, res) => {
// 	const id = req.params.id;

// 	try {
// 		const result = await deleteUser(id);
// 		res.status(200).send(result);
// 	} catch (error) {
// 		res.status(error.code).send(error.msg);
// 	}
// });

export default router;
