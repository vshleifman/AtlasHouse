import { MongoClient } from 'mongodb';

const url = 'mongodb://mongo:27017';

const dbName = 'AtlasHouse';

const client = new MongoClient(url, { useUnifiedTopology: true });

const run = async () => {
	try {
		await client.connect();
		console.log('Connected');

		const db = client.db(dbName);
		const collection = db.collection('test');
	} finally {
		await client.close();
	}
};

run().catch(console.dir);
