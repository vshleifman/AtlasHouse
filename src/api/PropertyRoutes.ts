import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import {
	PartialSchemaClassIntersection,
	QueryOptions,
	Req,
	UserType,
} from '../types/types';
import checkAdmin from '../middleware/checkAdmin';
import PropertyService from '../services/PropertyService';
import PropertyModel from '../models/PropertyModel';
import extractQuery from './extractQuery';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/properties', async (req, res, next) => {
	const { match, dateMatch, options } = extractQuery(
		PropertyModel,
		req.query as Record<
			string,
			keyof PartialSchemaClassIntersection & keyof QueryOptions
		>,
	);

	try {
		const result = await PropertyService.getProperties(
			match,
			options,
			dateMatch,
		);

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
			result = await (await PropertyService.getProperty(id))
				.populate('bookings')
				.execPopulate();
		} else {
			result = await PropertyService.getProperty(id);
		}
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.use(auth);

router.post('/properties', checkAdmin, async (req, res, next) => {
	try {
		const result = await PropertyService.addProperty(req.body);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/properties/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await PropertyService.updateProperty(id, req.body);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/properties/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await PropertyService.deleteProperty(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
