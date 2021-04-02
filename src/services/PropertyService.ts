import { DocumentType, getName, mongoose } from '@typegoose/typegoose';
import { Booking } from '../models/BookingModel';
import { QueryOptions } from 'types/types';
import PropertyModel, { Property } from '../models/PropertyModel';
import handleDBExceptions from './exceptions/handleDBexceptions';
import { NotFoundException, ServerException } from './exceptions/MyExceptions';

const getProperties = async (
	match: Partial<Property>,
	options: QueryOptions,
	dateMatch: { checkIn: string; checkOut: string },
): Promise<DocumentType<Property>[]> => {
	try {
		let properties = await PropertyModel.find(match, null, options).populate(
			'bookings',
		);

		if (dateMatch.checkIn) {
			const filteredResult = properties.filter(doc =>
				(doc.bookings as Booking[]).every(
					booking =>
						booking.checkIn > dateMatch.checkIn ||
						booking.checkOut < dateMatch.checkOut,
				),
			);
			properties = filteredResult;
		}
		return properties;
	} catch (error) {
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
