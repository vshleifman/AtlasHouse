import { DocumentType } from '@typegoose/typegoose';
import { UserType } from '../types/types';
import {
	AdminModel,
	Admin,
	UserModel,
	User,
	ProtoUser,
	ProtoUserModel,
} from '../models/UserModel';
import { ServerException } from './exceptions/MyExceptions';

const signup = async (
	data: { user: ProtoUser; type: string }, // partial?
): Promise<{
	user: DocumentType<Admin> | DocumentType<User>;
	token: string;
}> => {
	try {
		if (data.type === UserType.ADMIN) {
			const user = await AdminModel.create(data.user);
			const token = await user.generateAuthToken();
			return { user, token };
		}
		if (data.type === UserType.USER) {
			const user = await UserModel.create(data.user);
			const token = await user.generateAuthToken();
			return { user, token };
		}
		throw new Error('Specify user type');
	} catch (error) {
		throw new ServerException(error);
	}
};

const signin = async (
	email: string,
	password: string,
): Promise<{ user: ProtoUser; token: string }> => {
	const user = (await ProtoUserModel.findByCredentials(
		email,
		password,
	)) as DocumentType<ProtoUser>;
	const token = await user.generateAuthToken();
	return { user, token };
};

export default { signin, signup };
