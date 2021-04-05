import mongoose from 'mongoose';

mongoose.connect(
	process.env.MONGODB_URL || 'mongodb://mongo:27017/AtlasHouse-api',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
);

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	console.log('mongoose connected to db');
	console.log('------------------------------');
});
