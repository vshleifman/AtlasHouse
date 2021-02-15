import { ReturnModelType } from '@typegoose/typegoose';
import { Booking } from 'models/BookingModel';
import { Property } from 'models/PropertyModel';
import { ProtoUser } from 'models/UserModel';
import { QueryOptions } from 'types/types';

const extractQuery = (
	model: ReturnModelType<typeof Booking | typeof ProtoUser | typeof Property>,
	query: any,
): {
	match: Partial<Booking | ProtoUser | Property>;
	options: QueryOptions;
} => {
	const modelObject = new model();

	const match: Partial<Booking | ProtoUser | Property> = {};
	const options: QueryOptions = { sort: {} };

	Object.keys(query).forEach(key => {
		if (key in modelObject) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			match[key] = query[key];
		} else if (key === 'sortBy') {
			const parts = query[key].split(':');
			options.sort![parts[0]] = parts[1] === 'desc' ? -1 : 1;
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			options[key] = parseInt(query[key]);
		}
	});

	return { match, options };
};

export default extractQuery;
