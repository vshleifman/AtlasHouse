import { UserModel } from '../models/UserModel';
import mongoose from 'mongoose';
import { buildUser } from './utils/generate';

class TestDB {
	#db: mongoose.Connection;

	constructor() {
		this.#db = mongoose.connection;
	}

	#seed = async () => {
		const userData = buildUser({});

		await UserModel.create({
			email: 'seed@test.com',
			firstName: userData.firstName,
			lastName: userData.lastName,
			password: '1234567',
		});
	};

	async start() {
		await mongoose.connect(
			process.env.TEST_DB_URL || 'mongodb://mongo:27017/AtlasHouse-api-test',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			},
			err => {
				if (err) console.error(err);
			},
		);
	}

	async drop() {
		this.#db.dropDatabase();
		await this.#seed();
	}
}

export default TestDB;
