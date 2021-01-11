import express from 'express';
import createUser from '../services/createUser';
// import User from '../models/UserModel';

const router = express.Router();

router.post('/user', async (req, res) => {
	const result = await createUser(req.body);

	if (result.email) {
		res.status(200).send(result);
	} else {
		res.status(400).send(result);
	}
});

export default router;
