import {
	prop,
	getModelForClass,
	ModelOptions,
	Severity,
	DocumentType,
	Ref,
} from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Booking } from './BookingModel';

export interface Property extends Base {}

@ModelOptions({
	options: { allowMixed: Severity.ALLOW },
	schemaOptions: {
		toObject: {
			virtuals: true,
		},
	},
})
export class Property extends TimeStamps {
	@prop({ required: true, trim: true })
	public name!: string;

	@prop({ required: true, trim: true, unique: true })
	public codeID!: string;

	@prop()
	public price?: number;

	@prop({ default: true })
	public isCleaned?: boolean;

	@prop()
	public mainPicture?: Buffer;

	@prop()
	public amenities?: {
		balcony: boolean;
		bathtub: boolean;
	};

	@prop({ default: [] })
	public pictures!: Buffer[];

	@prop()
	public description?: string;

	@prop({
		default: [],
		ref: () => (doc: DocumentType<Property>) => doc.from!,
		foreignField: () => 'property',
		localField: (doc: DocumentType<Property>) => doc.local!,
	})
	public bookings!: Ref<Booking>[];
	@prop()
	public local?: string;
	@prop()
	public from?: string;

	public toJSON(this: DocumentType<Property>): Partial<DocumentType<Property>> {
		const user = this;
		const userObject: Partial<DocumentType<Property>> = user.toObject();

		delete userObject.local;
		delete userObject.from;

		return userObject;
	}
}

const PropertyModel = getModelForClass(Property);

export default PropertyModel;
