import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { ProtoUser } from '../models/UserModel';

export interface Req extends Request {
	user?: DocumentType<ProtoUser>;
	token?: string;
}

export enum UserType {
	ADMIN = 'Admin',
	USER = 'User',
}

export interface QueryOptions {
	limit?: number;
	skip?: number;
}
