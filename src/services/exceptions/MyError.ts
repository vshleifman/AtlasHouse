export class NotFoundException extends Error {
	constructor(msg?: string) {
		super(msg || 'User Not Found');
	}
}

export class UnauthorizedException extends Error {
	constructor(msg?: string) {
		super(msg || 'Authorization Failed');
	}
}

export class ServerException extends Error {
	constructor(msg?: string) {
		super(msg || 'Internal Server Exception');
	}
}

export class BadRequestException extends Error {
	constructor(msg?: string) {
		super(msg || 'Bad Request');
	}
}
