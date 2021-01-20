import { DocumentType } from '@typegoose/typegoose';
import UserModel, { User } from '../models/UserModel';
import { ServerException } from './exceptions/MyExceptions';

const signup = async (data: User): Promise<{ user: User; token: string }> => {
	try {
		const user = await UserModel.create(data);
		const token = await user.generateAuthToken();
		return { user, token };
	} catch (error) {
		throw new ServerException(error);
	}
};

const signin = async (
	email: string,
	password: string,
): Promise<{ user: User; token: string }> => {
	const user = (await UserModel.findByCredentials(
		email,
		password,
	)) as DocumentType<User>;
	const token = await user.generateAuthToken();
	return { user, token };
};

export default { signin, signup };
