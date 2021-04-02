import UserService from '../../services/UserService';
import { buildUser } from '../../tests/utils/generate';

import { UserModel } from '../../models/UserModel';

jest.mock('../../models/UserModel', () => {
	findById: jest.fn().mockReturnValue(buildUser({}));
});

it('deletes user', async () => {
	const user = buildUser({});
	UserService.deleteOne(user._id);
	expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(user._id);
});

it('updates user', async () => {
	const user = buildUser({});
	UserService.update(user._id, { firstName: 'banana' });
	UserModel.findById;
	expect(UserModel.findById).toHaveBeenCalledWith(user._id);
	expect(UserModel).toHaveBeenCalledWith(user._id);
});
