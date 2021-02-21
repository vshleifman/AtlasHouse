import { DocumentType, mongoose } from '@typegoose/typegoose';
import { UserModel, User } from '../models/UserModel';
import { NotFoundException } from './exceptions/MyExceptions';
import handleDBExceptions from './exceptions/handleDBexceptions';

const update = async (
	id: mongoose.Types.ObjectId,
	data: Partial<User>,
): Promise<DocumentType<User>> => {
	try {
		const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
		if (!user) {
			throw new NotFoundException();
		}
		user.save();
		return user;
	} catch (error) {
		handleDBExceptions(error);
		throw error;
	}
};

const deleteOne = async (_id: string): Promise<DocumentType<User>> => {
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

export default { update, deleteOne };
