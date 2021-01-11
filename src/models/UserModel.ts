import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import isEmail from 'validator/lib/isEmail';

@pre<User>('save', function () {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;
})
export class User {
	@prop({ required: true, trim: true })
	public firstName?: string;

	@prop({ required: true, trim: true })
	public lastName?: string;

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
	public email?: string;

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
	public password?: string;

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
}

const UserModel = getModelForClass(User);

export default UserModel;
