import { DocumentType, mongoose } from '@typegoose/typegoose';
import express from 'express';
import BookingModel, { Booking } from '../models/BookingModel';
import checkAdmin from '../middleware/checkAdmin';
import BookingService from '../services/BookingService';
import {
	PartialSchemaClassIntersection,
	QueryOptions,
	Req,
	UserType,
} from '../types/types';
import { User } from '../models/UserModel';
import extractQuery from './extractQuery';
// import moment from 'moment';

const router = express.Router();

router.get('/bookings', async (req: Req, res, next) => {
	if (Object.keys(req.query).some(key => typeof key !== 'string')) {
		return res.send('{}');
	}

	const { match, options } = extractQuery(
		BookingModel,
		req.query as Record<
			string,
			keyof PartialSchemaClassIntersection & keyof QueryOptions
		>,
	);

	try {
		let result;
		if (req.user?.__t === UserType.ADMIN) {
			result = await BookingService.getBookings(match, options);
		} else if (req.user?.__t === UserType.USER) {
			const user = (await req.user
				.populate({ path: 'bookings', match, options })
				.execPopulate()) as DocumentType<User>;
			result = user.bookings as DocumentType<Booking>[];
		}
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
});

router.post('/bookings', async (req: Req, res, next) => {
	// req.body.checkIn = moment(req.body.checkIn).toISOString();
	// req.body.checkOut = moment(req.body.checkOut).toISOString();
	try {
		const result = await BookingService.createBooking({
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
		const result = await BookingService.getBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.patch('/bookings/:id', checkAdmin, async (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = await BookingService.updateBooking(id, req.body);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

router.delete('/bookings/:id', checkAdmin, (req, res, next) => {
	try {
		const id = (req.params.id as unknown) as mongoose.Types.ObjectId;
		const result = BookingService.deleteBooking(id);
		res.send(result);
	} catch (error) {
		next(error);
	}
});

export default router;
