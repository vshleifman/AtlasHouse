import {
	prop,
	getModelForClass,
	ModelOptions,
	Severity,
	mongoose,
	ReturnModelType,
	DocumentType,
	Ref,
	getName,
} from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Booking } from '../../virtualsTest/models/ModelC';

export interface Property extends Base {}

@ModelOptions({
	options: { allowMixed: Severity.ALLOW },
	schemaOptions: { toJSON: { virtuals: true } },
})
export class Property extends TimeStamps {
	@prop({ required: true, trim: true })
	public name!: string;

	@prop({ required: true, trim: true, unique: true })
	public codeID!: string;

	@prop()
	public price?: number;

	@prop({ default: true })
	public available?: boolean;

	@prop({ default: true })
	public isCleaned?: boolean;

	@prop()
	public mainPicture?: Buffer;

	@prop()
	public pictures?: Buffer[];

	@prop()
	public description?: string;

	@prop({
		ref: () => (doc: DocumentType<Property>) => doc.from!,
		foreignField: () => 'property',
		localField: (doc: DocumentType<Property>) => doc.local!,
	})
	public bookings?: Ref<Booking>[];

	@prop({ default: '_id' })
	public local?: string;

	@prop({ default: 'Booking' })
	public from?: string;
}

const PropertyModel = getModelForClass(Property);

export default PropertyModel;
