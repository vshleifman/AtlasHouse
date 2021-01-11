import UserModel from '../models/UserModel';
import { User } from '../models/UserModel';

export const createUser = async (data: User): Promise<User> => {
	try {
		return await UserModel.create(data);
	} catch (error) {
		return error;
	}
};

export const fetchUsers = async (): Promise<User[]> => {
	try {
		return await UserModel.find();
	} catch (error) {
		return error;
	}
};

export const fetchUser = async (_id: string): Promise<User | null> => {
	try {
		return await UserModel.findById(_id);
	} catch (error) {
		return error;
	}
};

export const updateUser = async (
	_id: string,
	data: User,
): Promise<User | string> => {
	try {
		const updates = Object.keys(data);
		console.log({ updates });
		const allowedUpdates = [
			'firstName',
			'lastName',
			'email',
			'password',
			'telNum',
			'country',
		];
		const isValidOperation = updates.every(update =>
			allowedUpdates.includes(update),
		);

		if (!isValidOperation) {
			return 'Invalid change!';
		}
		const user = await fetchUser(_id);
		if (user?.email) {
			updates.forEach(update => (user[update] = data[update]));
			return user;
		} else {
			return 'User not found';
		}
	} catch (error) {
		return error;
	}
};
