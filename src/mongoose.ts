import mongoose from 'mongoose';

mongoose.connect(
	process.env.MONGODB_URL || 'mongodb://localhost:2717/AtlasHouse-api',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	console.log('mongoose connected to db');
	console.log('------------------------------');
});
