import { mongoose } from '@typegoose/typegoose';
import { BadRequestException } from './MyExceptions';

const handleDBExceptions = (error: mongoose.CastError): void => {
	if (error.kind === ('ObjectId' || 'Boolean')) {
		throw new BadRequestException(error.reason);
	}
};

export default handleDBExceptions;
