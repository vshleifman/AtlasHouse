import mongoose from 'mongoose';
import UserModel from '../models/UserModel';


mongoose.connect('mongodb://mongo:27017/AtlasHouse-api', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

    

    let document = await UserModel.create({
        name: "banana25",
        email: "type@gmail.com"
    });

    document.save()
    console.log(document);
    

    

    // testTypeUser.save((err, user) => {
    //     if (err) {
    //         console.error(err)
    //     }
    //     console.log(user)
    // })

    // const userSchema = new mongoose.Schema({
    //     name: String,
    //     email: String
    // });

    // const User = mongoose.model('User', userSchema)

    // const testUser = User.create({
    //     name: "apple1",
    //     email: 'v4ik@gmail.com'
    // })

    // testUser.save((err, user) => {
    //     if (err) {
    //         console.error(err)
    //     }
    //     console.log(user);
    // })

    // User.find((err, users) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     console.log(users)
    // })
});
