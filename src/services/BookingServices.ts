import { DocumentType, mongoose } from '@typegoose/typegoose';
import { QueryOptions } from 'types/types';
import BookingModel, { Booking } from '../models/BookingModel';
import handleDBExceptions from './exceptions/handleDBexceptions';
import { NotFoundException } from './exceptions/MyExceptions';

const createBooking = async (data: Booking): Promise<DocumentType<Booking>> => {
	try {
		return await BookingModel.create(data);
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const deleteBooking = async (
	_id: mongoose.Types.ObjectId,
): Promise<DocumentType<Booking>> => {
	try {
		const booking = await BookingModel.findByIdAndDelete(_id);
		return booking!;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
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
		handleDBExceptions(error);
		throw error;
	}
};

const getBookings = async (
	match: Partial<Booking>,
	options: QueryOptions,
): Promise<DocumentType<Booking>[]> => {
	try {
		const result = await BookingModel.find(match, null, options)
			.populate('user')
			.populate('property')
			.exec();
		return result;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

export default {
	createBooking,
	deleteBooking,
	getBooking,
	updateBooking,
	getBookings,
};
