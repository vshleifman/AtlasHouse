import { ReturnModelType } from '@typegoose/typegoose';
import { Booking } from 'models/BookingModel';
import { Property } from 'models/PropertyModel';
import { ProtoUser } from 'models/UserModel';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const extractQuery = (
	model: ReturnModelType<typeof Booking | typeof ProtoUser | typeof Property>,
	query: any,
): { match: any; options: any } => {
	const modelObject = new model();

	const match: Partial<Booking | ProtoUser | Property> = {};
	const options: { limit?: number; skip?: number } = {};

	Object.keys(query).forEach(key => {
		if (key in modelObject) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			match[key] = query[key];
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			options[key] = parseInt(query[key]);
		}
	});

	return { match, options };
};

export default extractQuery;
