import faker from 'faker';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { Req } from 'types/types';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const getId = () => faker.random.uuid();
const getPassword = (...args: []) => `!@#$${faker.internet.password(...args)}`;
const getFirstName = () => faker.name.firstName();
const getLastName = () => faker.name.lastName();
const getEmail = () => faker.internet.email();

export const buildUser = ({ ...overrides }) => {
	const _id = getId() as ObjectId | (string & ObjectId);
	const token = jwt.sign({ _id: _id!.toString() }, process.env.JWT_SECRET!);
	return {
		_id,
		firstName: getFirstName(),
		lastName: getLastName(),
		email: getEmail(),
		password: getPassword(),
		tokens: [
			{
				token,
			},
		],
		...overrides,
	};
};
export const buildReq = ({ user = buildUser({}), ...overrides }): Req => {
	const req = ({
		user,
		body: {},
		params: {},
		overrides,
		token: user.tokens[0].token,
	} as unknown) as Req;
	return req;
};

export const buildRes = (overrides = {}): Response => {
	const res = ({
		json: jest.fn(() => res).mockName('json'),
		status: jest.fn(() => res).mockName('status'),
		overrides,
	} as unknown) as Response;
	return res;
};

export const buildNext = () => {
	return jest.fn().mockName('next');
};
