import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import checkAdmin from '../middleware/checkAdmin';
import PropertyServices from '../services/PropertyServices';

const router = express.Router();

router.get('/properties', async (req, res, next) => {
	try {
		const result = await PropertyServices.getProperties();
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/properties/:id', async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await PropertyServices.getProperty(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/properties', checkAdmin, async (req, res, next) => {
	try {
		const result = await PropertyServices.addProperty(req.body);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/properties/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await PropertyServices.deleteProperty(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
