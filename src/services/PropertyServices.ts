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
		if (error.kind === 'ObjectId') {
			throw new BadRequestException(error.reason);
		} else {
			throw error;
		}
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
		if (error.kind === 'ObjectId') {
			throw new BadRequestException('Wrong Property Id');
		}
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
