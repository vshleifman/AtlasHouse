import { DocumentType, mongoose } from '@typegoose/typegoose';
import { UserModel, User } from '../models/UserModel';
import {
	BadRequestException,
	NotFoundException,
} from './exceptions/MyExceptions';
import handleDBExceptions from './exceptions/handleDBexceptions';

const update = async (
	id: mongoose.Types.ObjectId,
	data: Partial<User>,
): Promise<DocumentType<User>> => {
	console.log({ data });

	try {
		const updates = Object.keys(data);

		const allowedUpdates = [
			'firstName',
			'lastName',
			'email',
			'password',
			'telNum',
			'country',
		];

		const user = await UserModel.findById(id);
		if (!user) {
			throw new NotFoundException();
		}

		updates.forEach(update => {
			console.log({ update });

			if (allowedUpdates.includes(update)) {
				//@ts-ignore
				user[update] = data[update];
			} else {
				throw new BadRequestException();
			}
		});
		await user.save();
		return user;
	} catch (error) {
		console.log(error);

		handleDBExceptions(error);
		throw error;
	}
};

const deleteOne = async (
	_id: mongoose.Types.ObjectId,
): Promise<DocumentType<User>> => {
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
