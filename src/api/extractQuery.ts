import { ReturnModelType } from '@typegoose/typegoose';
import { Booking } from 'models/BookingModel';
import { Property } from 'models/PropertyModel';
import { ProtoUser } from 'models/UserModel';
import { PartialSchemaClassIntersection, QueryOptions } from 'types/types';

type Match = Record<string, keyof PartialSchemaClassIntersection>;

const extractQuery = (
	model: ReturnModelType<typeof Booking | typeof ProtoUser | typeof Property>,
	query: Record<
		string,
		keyof PartialSchemaClassIntersection & keyof QueryOptions
	>,
): {
	match: Match;
	popMatch: { checkIn: string; checkOut: string };
	options: QueryOptions;
} => {
	const modelObject = new model();

	const match: Match = {};
	const popMatch = { checkIn: String(), checkOut: String() };
	const options: QueryOptions = { sort: {} };

	Object.keys(query).forEach(key => {
		if (key in modelObject) {
			if (key === 'amenities') {
				const amenityFilter: Record<string, string> = {};
				const amenity = query[key].split(':');

				amenityFilter[amenity[0]] = amenity[1];
				// @ts-ignore
				match[key] = amenityFilter;
			} else {
				match[key] = query[key];
			}
		} else if (key === 'sortBy') {
			const parts = query[key].split(':');
			options.sort![parts[0]] = parts[1] === 'desc' ? -1 : 1;
		} else if (key === 'dateRange') {
			const parts = query[key].split(';');
			const fromDate = parts[0].split('_');
			const toDate = parts[1].split('_');

			popMatch.checkIn = toDate[1];
			popMatch.checkOut = fromDate[1];
		} else {
			options[key] = parseInt(query[key]);
		}
	});
	return { match, popMatch, options };
};

export default extractQuery;
