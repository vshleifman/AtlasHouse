import {prop, getModelForClass} from '@typegoose/typegoose'

class User {
    @prop()
    public name?: string

    @prop()
    public email?: string

}

const UserModel = getModelForClass(User);

export default UserModel;