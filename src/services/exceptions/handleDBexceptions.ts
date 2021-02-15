import { mongoose } from '@typegoose/typegoose';
import { BadRequestException } from './MyExceptions';

const handleDBExceptions = (error: mongoose.CastError): void => {
	if (error.kind === 'Boolean' || error.kind === 'ObjectId') {
		throw new BadRequestException(error.reason);
	}
};

export default handleDBExceptions;
