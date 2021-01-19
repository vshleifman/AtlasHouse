import PropertyModel, { Property } from '../models/PropertyModel';

interface Result {
	result: string | Record<string, unknown>;
	code: string;
}

export const addProperty = async (data: Property): Promise<Property> => {
	try {
		return PropertyModel.create(data);
	} catch (error) {
		return error;
	}
};

export const getProperties = async (): Promise<Property[]> => {
	try {
		return await PropertyModel.find();
	} catch (error) {
		return error;
	}
};

export const getProperty = async (_id: string): Promise<Property | null> => {
	try {
		return PropertyModel.findById(_id);
	} catch (error) {
		return error;
	}
};

export const updateProperty = async (
	_id: string,
	data: Property,
): Promise<Property | Result> => {
	try {
		const updates = Object.keys(data) as (keyof Property)[];
		const property = await PropertyModel.findById(_id);

		if (property?.name) {
			updates.forEach(update => (property[update] = data[update]));
			property.save();
			return { result: property, code: '200' };
		} else {
			return { result: 'Property not found', code: '404' };
		}
	} catch (error) {
		return { result: error, code: '500' };
	}
};

export const deleteProperty = async (_id: string): Promise<Property> => {
	try {
	} catch (error) {
		return error;
	}
};
