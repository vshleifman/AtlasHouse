import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { ProtoUser } from '../models/UserModel';

export interface Req extends Request {
	user?: DocumentType<ProtoUser>;
}

export enum UserType {
	ADMIN = 'Admin',
	USER = 'User',
}
