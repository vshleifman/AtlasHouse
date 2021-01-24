import { DocumentType } from '@typegoose/typegoose';
import { UserModel, User } from '../models/UserModel';
import {
	BadRequestException,
	NotFoundException,
} from './exceptions/MyExceptions';

const getAllUsers = async (): Promise<User[]> => {
	return await UserModel.find();
};

const getOneUser = async (_id: string): Promise<DocumentType<User>> => {
	try {
		const result = await UserModel.findById(_id);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	} catch (error) {
		if (error.kind === 'ObjectId') {
			throw new BadRequestException('Wrong User Id');
		}
		throw error;
	}
};

const deleteOneUser = async (_id: string): Promise<DocumentType<User>> => {
	try {
		const result = await UserModel.findByIdAndDelete(_id);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	} catch (error) {
		if (error.kind === 'ObjectId') {
			throw new BadRequestException('Wrong User Id');
		}
		throw error;
	}
};

export default { getAllUsers, getOneUser, deleteOneUser };
