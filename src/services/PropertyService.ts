import { DocumentType, getName, mongoose } from '@typegoose/typegoose';
import { Booking } from '../models/BookingModel';
import { QueryOptions } from 'types/types';
import PropertyModel, { Property } from '../models/PropertyModel';
import handleDBExceptions from './exceptions/handleDBexceptions';
import { NotFoundException, ServerException } from './exceptions/MyExceptions';
import { db } from '../mongoose';

const getProperties = async (
	match: Partial<Property>,
	options: QueryOptions,
	dateMatch: { desiredCheckIn: string; desiredCheckOut: string },
): Promise<DocumentType<Property>[]> => {
	try {
		// const aggregate = await PropertyModel.aggregate([
		// {
		// $lookup: {
		// 	from: 'bookings',
		// 	let: { paidFor: '$paidFor' },
		// 	pipeline: [
		// 		{
		// 			$match: { $expr: { $eq: ['$$paidFor', 'false'] } },
		// 		},
		// 	],
		// 	as: 'bookings',
		// },
		// },

		// {
		// 	$match: {
		// 		$expr: { $gt: ['$bookings', 0] },
		// 	},
		// },
		// {
		// 	$unset: ['local', 'from'],
		// },
		// ]);

		let properties = await PropertyModel.find(match, null, options).populate(
			'bookings',
		);

		if (dateMatch.desiredCheckIn) {
			const filteredProperties = properties.filter(doc =>
				(doc.bookings as Booking[]).every(
					booking =>
						booking.checkIn > dateMatch.desiredCheckOut ||
						booking.checkOut < dateMatch.desiredCheckIn,
				),
			);
			properties = filteredProperties;
		}
		// console.log(aggregate);

		return properties;
	} catch (error) {
		console.log(error);

		handleDBExceptions(error);
		throw error;
	}
};

const getProperty = async (
	_id: mongoose.Types.ObjectId,
): Promise<DocumentType<Property>> => {
	try {
		const result = await PropertyModel.findById(_id);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const addProperty = async (data: Property): Promise<DocumentType<Property>> => {
	try {
		return await PropertyModel.create({
			...data,
			local: '_id',
			from: getName(Booking),
		});
	} catch (error) {
		throw new ServerException(error);
	}
};

const updateProperty = async (
	_id: mongoose.Types.ObjectId,
	data: Partial<Property>,
): Promise<Property> => {
	try {
		const property = await PropertyModel.findByIdAndUpdate(_id, data, {
			new: true,
		});
		if (!property) {
			throw new NotFoundException('Property Not Found');
		}
		return property;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const deleteProperty = async (
	_id: mongoose.Types.ObjectId,
): Promise<Property> => {
	try {
		const result = await PropertyModel.findByIdAndDelete(_id);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

export default {
	getProperties,
	getProperty,
	addProperty,
	deleteProperty,
	updateProperty,
};
