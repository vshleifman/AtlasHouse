import { UserModel } from '../UserModel';
import TestDB from '../../tests/TestDB';
import bcrypt from 'bcrypt';

beforeAll(async () => {
	await new TestDB().start();
});

it('hashes the password on user creation', async () => {
	const password = '123456789';

	const user = await UserModel.create({
		firstName: 'Test',
		lastName: 'User',
		email: 'test@test.com',
		password,
	});

	const isValid = bcrypt.compareSync(password, user.password);

	expect(isValid).toBe(true);
});

it('hashes the password on save', async () => {
	const password = '123456789';

	const user = await UserModel.findOne({ email: 'seed@test.com' });

	user!.password = password;

	await user!.save();

	const isValid = bcrypt.compareSync(password, user!.password);

	expect(isValid).toBe(true);

	UserModel.findByIdAndUpdate();
});

xit('hashes the password on update', async () => {
	const password = '123456789';

	const user = await UserModel.findOneAndUpdate(
		{ email: 'seed@test.com' },
		{
			password,
		},
	);

	const isValid = bcrypt.compareSync(password, user!.password);

	expect(isValid).toBe(true);
});
