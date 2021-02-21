import { DocumentType, getName } from '@typegoose/typegoose';
import { UserType } from '../types/types';
import {
	AdminModel,
	Admin,
	UserModel,
	User,
	ProtoUser,
	ProtoUserModel,
} from '../models/UserModel';
import handleDBExceptions from './exceptions/handleDBexceptions';

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
			const user = await UserModel.create({
				...data.user,
				local: '_id',
				from: getName(User),
			});
			const token = await user.generateAuthToken();
			return { user, token };
		}
		throw new Error('Specify user type');
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const signin = async (
	email: string,
	password: string,
): Promise<{
	user: DocumentType<Admin> | DocumentType<User>;
	token: string;
}> => {
	try {
		const user = (await ProtoUserModel.findByCredentials(
			email,
			password,
		)) as DocumentType<ProtoUser>;
		const token = await user.generateAuthToken();
		return { user, token };
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const signout = async (
	user: DocumentType<ProtoUser>,
	reqToken: string,
): Promise<void> => {
	try {
		user.tokens = user.tokens.filter(token => token.token !== reqToken);
		await user.save();
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const signoutAll = async (user: DocumentType<ProtoUser>): Promise<void> => {
	user.tokens = [];
	await user?.save();
};

export default { signin, signup, signout, signoutAll };
