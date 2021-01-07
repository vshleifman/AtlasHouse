import mongoose from 'mongoose';
import {prop, getModelForClass} from '@typegoose/typegoose'

mongoose.connect('mongodb://mongo:27017/AtlasHouse-api', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

    class TypedUserClass {
        @prop()
        public name?: string

        @prop()
        public email?: string
    }

    const TypedUser = getModelForClass(TypedUserClass)

    const testTypeUser = new TypedUser({
        name: "typeVik",
        email: "type@gmail.com"
    })

    let document = await TypedUser.create({
        name: "typeVik",
        email: "type@gmail.com"
    })
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

    // const testUser = new User({
    //     name: "Vik4",
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
