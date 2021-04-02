import {
	buildReq,
	buildRes,
	buildNext,
	buildUser,
} from '../../tests/utils/generate';
import UserServices from '../../services/UserService';
import axios from 'axios';
import request from 'supertest';
import { app } from '../../app';

const url = `https://${process.env.DOMAIN}/api`;

test('get:users/me retruns user', done => {
	const user = buildUser({});
	request(app)
		.get('/')
		.expect(200)
		.end((err, res) => {
			console.log(res.text);
			done();
		});

	// .post('/singin')
	// .send(JSON.parse('{"email": "test@test.test", "password": "passpass"}'))
	// .expect(200, done);

	// .get('/users/me')
	// .set({ Authorization: user.tokens[0].token })
	// .expect(201);
	// const result = await axios.get(`${url}/users/me`, {
	// 	headers: {
	// 		Authorization: `${user.tokens[0].token}`,
	// 	},
	// });
	// expect(result.data).toHaveProperty('_id');
});

// test.only('post:signin returns user', async () => {
// 	const result = await axios.post(
// 		`${url}/signin`,
// 		JSON.parse('{"email": "test@test.test", "password": "passpass"}'),
// 	);
// 	expect(result.data.user).toBe
// });
