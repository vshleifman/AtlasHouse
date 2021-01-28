import {
	prop,
	getModelForClass,
	ModelOptions,
	Severity,
} from '@typegoose/typegoose';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Property {
	@prop({ required: true, trim: true })
	public name!: string;

	@prop({ required: true, trim: true, unique: true })
	public codeID!: string;

	@prop()
	public price?: number;

	@prop({ default: true })
	public available?: boolean;

	@prop()
	public bookedDates?: { checkIn: Date; checkOut: Date }[]; //sort dates on entry?

	@prop({ default: true })
	public isCleaned?: boolean;

	@prop()
	public mainPicture?: Buffer;

	@prop()
	public pictures?: Buffer[];

	@prop()
	public description?: string;
}

const PropertyModel = getModelForClass(Property);

export default PropertyModel;
