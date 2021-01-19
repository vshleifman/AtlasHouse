import UserModel, { User } from '../models/UserModel';
import { ServerException } from './exceptions/MyError';

export const signup = async (data: User): Promise<User> => {
	try {
		return await UserModel.create(data);
	} catch (error) {
		throw new ServerException(error);
	}
};

export const signin = async (
	email: string,
	password: string,
): Promise<User> => {
	try {
		return await UserModel.findByCredentials(email, password);
	} catch (error) {
		return error;
	}
};
