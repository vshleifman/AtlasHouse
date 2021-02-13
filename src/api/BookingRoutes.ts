import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import checkAdmin from '../middleware/checkAdmin';
import BookingServices from '../services/BookingServices';
import { Req, UserType } from '../types/types';

const router = express.Router();

router.get('/bookings', async (req: Req, res, next) => {
	try {
		let result;
		if (req.user?.__t === UserType.ADMIN) {
			result = await BookingServices.getBookings();
		} else if (req.user?.__t === UserType.USER) {
			result = await req.user.populate('bookings').execPopulate();
		}
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/bookings', async (req: Req, res, next) => {
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

router.get('/bookings/:id', async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await BookingServices.getBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/bookings/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await BookingServices.updateBooking(id, req.body);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/bookings/:id', checkAdmin, (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = BookingServices.deleteBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
