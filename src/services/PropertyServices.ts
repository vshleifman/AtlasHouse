import { DocumentType, mongoose } from '@typegoose/typegoose';
import PropertyModel, { Property } from '../models/PropertyModel';
import {
	BadRequestException,
	NotFoundException,
	ServerException,
} from './exceptions/MyExceptions';

const getProperties = async (): Promise<DocumentType<Property>[]> => {
	return await PropertyModel.find();
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
		if (error.kind === 'ObjectId') {
			throw new BadRequestException('Wrong Property Id');
		}
		throw error;
	}
};

const addProperty = async (data: Property): Promise<DocumentType<Property>> => {
	try {
		return await PropertyModel.create(data);
	} catch (error) {
		throw new ServerException(error);
	}
};

// const updateProperty = async (
// 	_id: string,
// 	data: Property,
// ): Promise<Property | Result> => {
// 	try {
// 		const updates = Object.keys(data) as (keyof Property)[];
// 		const property = await PropertyModel.findById(_id);

// 		if (property?.name) {
// 			updates.forEach(update => (property[update] = data[update]));
// 			property.save();
// 			return { result: property, code: '200' };
// 		} else {
// 			return { result: 'Property not found', code: '404' };
// 		}
// 	} catch (error) {
// 		return { result: error, code: '500' };
// 	}
// };

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
		if (error.kind === 'ObjectId') {
			throw new BadRequestException('Wrong Property Id');
		}
		throw error;
	}
};

export default { getProperties, getProperty, addProperty, deleteProperty };
