import UserModel from '../models/UserModel';
import { User } from '../models/UserModel';

const createUser = async (data: User) => {
	try {
		const user = await UserModel.create(data);
		console.log(user);
		return user;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default createUser;
