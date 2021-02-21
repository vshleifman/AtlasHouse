import {
	getModelForClass,
	modelOptions,
	mongoose,
	prop,
} from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Property } from './PropertyModel';
import { User } from './UserModel';

export interface Booking extends Base {}
@modelOptions({
	schemaOptions: {
		toJSON: { virtuals: true },
	},
})
export class Booking extends TimeStamps {
	@prop({ required: true, ref: () => Property })
	public property!: mongoose.Types.ObjectId;

	@prop({ required: true, ref: () => User })
	public user!: mongoose.Types.ObjectId;

	@prop({ required: true })
	checkIn!: Date;

	@prop({ required: true })
	checkOut!: Date;

	@prop({ default: false })
	paidFor?: boolean;
}

const BookingModel = getModelForClass(Booking);

export default BookingModel;
