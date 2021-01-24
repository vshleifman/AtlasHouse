import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { ObjectId } from 'mongodb';
import { ProtoUser } from '../models/UserModel';

export interface Req extends Request {
	user?: DocumentType<ProtoUser>;
	token?: string;
}

export enum UserType {
	ADMIN = 'Admin',
	USER = 'User',
}
