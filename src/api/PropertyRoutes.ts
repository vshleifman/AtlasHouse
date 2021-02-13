import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import { Req, UserType } from '../types/types';
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

router.get('/properties/:id', async (req: Req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		let result;
		if (req.user?.__t === UserType.ADMIN) {
			result = await (await PropertyServices.getProperty(id))
				.populate('bookings')
				.execPopulate();
		} else if (req.user?.__t === UserType.USER) {
			result = await PropertyServices.getProperty(id);
		}
		res.status(200).send(result);
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

router.patch('/properties/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await PropertyServices.updateProperty(id, req.body);
		res.status(200).send(result);
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
