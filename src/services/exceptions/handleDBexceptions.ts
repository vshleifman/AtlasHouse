import { mongoose } from '@typegoose/typegoose';
import {
	BadRequestException,
	NotFoundException,
	ServerException,
	UnauthorizedException,
} from './MyExceptions';

const handleDBExceptions = (error: mongoose.CastError): void => {
	if (error.message.includes('E11000') && error.message.includes('email')) {
		throw new BadRequestException('This email is not available');
	} else if (error.message.includes('User validation failed')) {
		throw new BadRequestException(error.message);
	} else if (
		!(error instanceof NotFoundException) &&
		!(error instanceof UnauthorizedException) &&
		!(error instanceof BadRequestException)
	) {
		throw new ServerException(error.message);
	}
};

export default handleDBExceptions;
