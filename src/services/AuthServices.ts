import UserModel, { User } from '../models/UserModel';
import { ServerException } from './exceptions/MyExceptions';

const signup = async (data: User): Promise<User> => {
	try {
		return await UserModel.create(data);
	} catch (error) {
		throw new ServerException(error);
	}
};

const signin = async (email: string, password: string): Promise<User> => {
	return await UserModel.findByCredentials(email, password);
};

export default { signin, signup };
