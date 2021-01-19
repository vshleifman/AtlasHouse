import {
	prop,
	getModelForClass,
	pre,
	DocumentType,
} from '@typegoose/typegoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import { UnauthorizedException } from '../services/exceptions/MyError';

@pre<User>('save', async function () {
	const user = this;
	user.password = await bcrypt.hash(user.password, 8);
	console.log('preSsave hook');
})
// @pre<User>('findOneAndUpdate', async function () {
// 	const user = this;

// 	if (user.isModified('password')) {
// 		user.password = await bcrypt.hash(user.password, 8);
// 		console.log('modified');
// 	}
// })
export class User {
	@prop({ required: true, immutable: true, trim: true })
	public firstName!: string;

	@prop({ required: true, trim: true })
	public lastName!: string;

	@prop({
		required: true,
		unique: true,
		lowercase: true,
		validate(value) {
			if (!isEmail(value)) {
				throw new Error('Email not valid');
			}
			return true;
		},
	})
	public email!: string;

	@prop({
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain the word "password"');
			}
			return true;
		},
	})
	public password!: string;

	@prop({ trim: true })
	public telNum?: string;

	@prop()
	public country?: string;

	@prop()
	public rentedProperty?: string;

	@prop({ default: 0 })
	public numberOfStays?: number;

	@prop({ default: false })
	public isAdmin?: boolean;

	@prop()
	public checkIn?: Date;

	@prop()
	public checkOut?: Date;

	public static async findByCredentials(
		email: string,
		password: string,
	): Promise<User> {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new UnauthorizedException('Unable to login');
		}

		const isMatch = bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new UnauthorizedException('Unable to login');
		}

		return user;
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
