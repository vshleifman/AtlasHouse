import { mongoose } from '@typegoose/typegoose';
import { BadRequestException, NotFoundException } from './MyExceptions';

const handleDBExceptions = (error: mongoose.CastError): void => {
	if (!(error instanceof NotFoundException)) {
		throw new BadRequestException(error.reason);
	}
};

export default handleDBExceptions;
