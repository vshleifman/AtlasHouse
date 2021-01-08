import mongoose from 'mongoose';
import UserModel from '../models/UserModel';


mongoose.connect('mongodb://mongo:27017/AtlasHouse-api', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

});
