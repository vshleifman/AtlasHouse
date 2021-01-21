import {
	prop,
	getModelForClass,
	pre,
	DocumentType,
	Severity,
	ModelOptions,
} from '@typegoose/typegoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';

@pre<User>('save', async function () {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
})
// @pre<User>('findOneAndUpdate', async function () {
// 	const user = this;

// 	if (user.isModified('password')) {
// 		user.password = await bcrypt.hash(user.password, 8);
// 		console.log('modified');
// 	}
// })
@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
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

	@prop({ required: true })
	public tokens!: { token: string }[];

	public static async findByCredentials(
		email: string,
		password: string,
	): Promise<User> {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new UnauthorizedException('Unable to login1');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		console.log({ isMatch, password, up: user.password });

		if (!isMatch) {
			throw new UnauthorizedException('Unable to login2');
		}

		return user;
	}

	public async generateAuthToken(this: DocumentType<User>): Promise<string> {
		const user = this;
		const token = jwt.sign({ _id: user._id.toString() }, 'some.string');

		user.tokens = user.tokens.concat({ token });
		await user.save();
		return token;
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
