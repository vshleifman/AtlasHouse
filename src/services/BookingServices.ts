import { DocumentType, mongoose } from '@typegoose/typegoose';
import BookingModel, { Booking } from '../models/BookingModel';
import handleDBExceptions from './exceptions/handleDBexceptions';
import {
	BadRequestException,
	NotFoundException,
} from './exceptions/MyExceptions';

const createBooking = async (data: Booking): Promise<DocumentType<Booking>> => {
	return await BookingModel.create(data);
};

const deleteBooking = async (
	_id: mongoose.Types.ObjectId,
): Promise<DocumentType<Booking>> => {
	const booking = await BookingModel.findByIdAndDelete(_id);
	return booking!;
};

const updateBooking = async (
	id: mongoose.Types.ObjectId,
	data: Partial<Booking>,
): Promise<DocumentType<Booking>> => {
	try {
		const booking = await BookingModel.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!booking) {
			throw new NotFoundException('Booking Not Found');
		}
		return booking;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const getBooking = async (
	_id: mongoose.Types.ObjectId,
): Promise<DocumentType<Booking>> => {
	try {
		const booking = await BookingModel.findById(_id)
			.populate('user')
			.populate('property')
			.exec();
		if (!booking) {
			throw new NotFoundException('Booking Not Found');
		}
		return booking;
	} catch (error) {
		if (error! instanceof NotFoundException) {
			throw new BadRequestException(error.message);
		}
		throw error;
	}
};

const getBookings = async (): Promise<DocumentType<Booking>[]> => {
	const result = await BookingModel.find()
		.populate('user')
		.populate('property')
		.exec();
	return result;
};

export default {
	createBooking,
	deleteBooking,
	getBooking,
	updateBooking,
	getBookings,
};
