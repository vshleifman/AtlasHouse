import {
	prop,
	getModelForClass,
	pre,
	DocumentType,
	Severity,
	ModelOptions,
	getDiscriminatorModelForClass,
	Ref,
} from '@typegoose/typegoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../services/exceptions/MyExceptions';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Booking } from './BookingModel';

export interface ProtoUser extends Base {}

@pre<ProtoUser>('save', async function () {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
})
@ModelOptions({
	options: { allowMixed: Severity.ALLOW },
	schemaOptions: {
		toObject: {
			virtuals: true,
		},
	},
})
export class ProtoUser extends TimeStamps {
	@prop({ required: true, trim: true })
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

	@prop({ required: true, default: [] })
	public tokens?: { token: string }[];

	public toJSON(this: DocumentType<ProtoUser>): Partial<DocumentType<User>> {
		interface UserObject extends Partial<DocumentType<User>> {
			role: number;
		}

		const user = this;
		const userObject: UserObject = user.toObject();

		userObject.__t === 'Admin'
			? (userObject.role = 2)
			: userObject.__t === 'User'
			? (userObject.role = 1)
			: (userObject.role = 0);

		delete userObject.__t;
		delete userObject.password;
		delete userObject.tokens;
		delete userObject.local;
		delete userObject.from;

		return userObject;
	}

	public static async findByCredentials(
		email: string,
		password: string,
	): Promise<ProtoUser> {
		const user = await ProtoUserModel.findOne({ email });

		if (!user) {
			throw new UnauthorizedException('Unable to login');
		}
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new UnauthorizedException('Unable to login');
		}

		return user;
	}

	public async generateAuthToken(
		this: DocumentType<ProtoUser>,
	): Promise<string> {
		const user = this;
		const token = jwt.sign(
			{ _id: user._id.toString() },
			process.env['JWT_SECRET'] || 'some.string',
		);

		user.tokens = user.tokens!.concat({ token });
		await user.save();
		return token;
	}
}

export class User extends ProtoUser {
	@prop({ default: 0 })
	public numberOfStays?: number;

	@prop({
		ref: () => (doc: DocumentType<User>) => doc.from!,
		foreignField: () => 'user',
		localField: (doc: DocumentType<User>) => doc.local!,
	})
	public bookings?: Ref<Booking>[];

	@prop()
	public local?: string;

	@prop()
	public from?: string;
}

export class Admin extends ProtoUser {}

export const ProtoUserModel = getModelForClass(ProtoUser);
export const UserModel = getDiscriminatorModelForClass(ProtoUserModel, User);
export const AdminModel = getDiscriminatorModelForClass(ProtoUserModel, Admin);
