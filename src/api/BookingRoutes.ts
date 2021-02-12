import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import BookingServices from '../services/BookingServices';
import { Req } from '../types/types';

const router = express.Router();

router.post('/booking', async (req: Req, res, next) => {
	try {
		const result = await BookingServices.createBooking({
			user: req.user!._id,
			...req.body,
		});
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.get('/booking/:id', async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await BookingServices.getBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/booking/:id', (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = BookingServices.deleteBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
