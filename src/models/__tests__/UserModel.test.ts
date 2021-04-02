import { ProtoUser, ProtoUserModel, UserModel } from '../UserModel';
import TestDB from '../../tests/TestDB';
import bcrypt from 'bcrypt';
import { buildUser } from '../../tests/utils/generate';

const db = new TestDB();

beforeAll(async () => {
	await db.start();
});
beforeEach(async () => {
	await db.drop();
});

it('hashes the password on user creation', async () => {
	const userData = buildUser({});

	const user = await UserModel.create({
		email: userData.email,
		firstName: userData.firstName,
		lastName: userData.lastName,
		password: userData.password,
	});

	const isValid = bcrypt.compareSync(userData.password, user.password);

	expect(isValid).toBe(true);
});

it('hashes the password on save', async () => {
	const userData = buildUser({});

	const password = userData.password;

	const user = await UserModel.findOne({ email: 'seed@test.com' });

	user!.password = password;

	await user!.save();

	const isValid = bcrypt.compareSync(password, user!.password);

	expect(isValid).toBe(true);

	UserModel.findByIdAndUpdate();
});

it('generates auth token', async () => {
	const userData = buildUser({});

	const user = await UserModel.create({
		email: userData.email,
		firstName: userData.firstName,
		lastName: userData.lastName,
		password: userData.password,
	});

	const token = await user.generateAuthToken();

	expect(user.tokens).toContainEqual({ token });
});

it('authorizes by credentials', async () => {
	const user = await ProtoUserModel.findByCredentials(
		'seed@test.com',
		'1234567',
	);
	expect(user.email).toBe('seed@test.com');
});
