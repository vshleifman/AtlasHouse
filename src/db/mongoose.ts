import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017/AtlasHouse-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	console.log('mongoose connected to db');
});
