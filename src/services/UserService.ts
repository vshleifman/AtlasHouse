import { DocumentType } from '@typegoose/typegoose';
import UserModel, { User } from '../models/UserModel';
import {
	BadRequestException,
	NotFoundException,
} from './exceptions/MyExceptions';

const getAll = async (): Promise<User[]> => {
	return await UserModel.find();
};

const getOne = async (_id: string): Promise<DocumentType<User>> => {
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

const update = async (
	id: string,
	data: Partial<User>,
): Promise<DocumentType<User>> => {
	// try {
	const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
	if (!user) {
		throw new NotFoundException();
	}
	user.save();
	return user;
	// } catch (error) {
	// 	return error;
	// }
	// try {
	// 	const updates = Object.keys(data) as (keyof User)[];
	// 	console.log({ updates });
	// 	const allowedUpdates = [
	// 		'firstName',
	// 		'lastName',
	// 		'email',
	// 		'password',
	// 		'telNum',
	// 		'country',
	// 	];

	// 	const isValidOperation = updates.every(update =>
	// 		allowedUpdates.includes(update),
	// 	);

	// 	if (!isValidOperation) {
	// 		return 'Invalid change!';
	// 	}
	// 	const user = await UserModel.findById(id);
	// 	if (user?.email) {
	// 		updates.forEach(update => (user[update] = data[update]));
	// 		await user.save();
	// 		return user;
	// 	} else {
	// 		return 'User not found';
	// 	}
	// } catch (error) {
	// 	return error;
	// }
};

const deleteOne = async (_id: string): Promise<DocumentType<User>> => {
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

export default { getAll, getOne, update, deleteOne };
