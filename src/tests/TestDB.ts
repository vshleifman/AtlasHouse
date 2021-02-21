import { UserModel } from '../models/UserModel';
import mongoose from 'mongoose';

class TestDB {
	#db: mongoose.Connection;

	constructor() {
		this.#db = mongoose.connection;
	}

	#seed = async () => {
		await UserModel.create({
			firstName: 'Test',
			lastName: 'User',
			email: 'seed@test.com',
			password: '12345678',
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

		this.#db.dropDatabase();

		await this.#seed();
	}
}

export default TestDB;
