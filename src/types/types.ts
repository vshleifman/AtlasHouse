import { DocumentType } from '@typegoose/typegoose';
import { Request } from 'express';
import { Booking } from '../models/BookingModel';
import { Property } from '../models/PropertyModel';
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
	[key: string]: number | undefined | { [key: string]: number };
	limit?: number;
	skip?: number;
	sort?: { [key: string]: number };
}

export type PartialSchemaClassIntersection = Partial<
	Booking & ProtoUser & Property
>;
