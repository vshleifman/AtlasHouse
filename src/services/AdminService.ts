import { DocumentType } from '@typegoose/typegoose';
import { QueryOptions } from 'types/types';
import { UserModel, User } from '../models/UserModel';
import handleDBExceptions from './exceptions/handleDBexceptions';
import { NotFoundException } from './exceptions/MyExceptions';

const getAllUsers = async (
	match: Partial<User>,
	options: QueryOptions,
): Promise<User[]> => {
	try {
		return await UserModel.find(match, null, options);
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const getOneUser = async (_id: string): Promise<DocumentType<User>> => {
	try {
		const result = await UserModel.findById(_id);
		if (!result) {
			throw new NotFoundException();
		}
		return result;
	} catch (error) {
		handleDBExceptions(error);
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
		handleDBExceptions(error);
		throw error;
	}
};

export default { getAllUsers, getOneUser, deleteOneUser };
