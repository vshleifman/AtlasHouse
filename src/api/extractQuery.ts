import { ReturnModelType } from '@typegoose/typegoose';
import { Booking } from 'models/BookingModel';
import { Property } from 'models/PropertyModel';
import { ProtoUser } from 'models/UserModel';
import { PartialSchemaClassIntersection, QueryOptions } from 'types/types';

type Match = {
	[key: string]: keyof PartialSchemaClassIntersection;
};

const extractQuery = (
	model: ReturnModelType<typeof Booking | typeof ProtoUser | typeof Property>,
	query: any,
): {
	match: Match;
	options: QueryOptions;
} => {
	const modelObject = new model();
	const match: Match = {};
	const options: QueryOptions = { sort: {} };

	Object.keys(query).forEach(key => {
		if (key in modelObject) {
			match[key] = query[key];
		} else if (key === 'sortBy') {
			const parts = query[key].split(':');
			options.sort![parts[0]] = parts[1] === 'desc' ? -1 : 1;
		} else {
			options[key] = parseInt(query[key]);
		}
	});

	return { match, options };
};

export default extractQuery;
