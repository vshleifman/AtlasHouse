import mongoose from 'mongoose';
import PropertyModel from '../models/PropertyModel';
import UserModel from '../models/UserModel';

mongoose.connect('mongodb://mongo:27017/AtlasHouse-api', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	// let user = UserModel.create({
	// 	firstName: 'Victor',
	// 	lastName: 'Shleifman',
	// 	email: 'test@gmail.com',
	// 	password: 'passtest',
	// });
	// let property = PropertyModel.create({
	// 	name: 'TestRoom',
	// 	codeID: '43C',
	// 	price: '455',
	// });
});
