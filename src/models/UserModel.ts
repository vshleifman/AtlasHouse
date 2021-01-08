import {prop, getModelForClass} from '@typegoose/typegoose'

class User {
    @prop()
    public firstName?: string

    @prop()
    public lastName?: string

    @prop()
    public email?: string
    
    @prop()
    public password?: string

    @prop()
    public telNum?: string

    @prop()
    public country?: string

    @prop()
    public rentedProperty?: string

    @prop()
    public numberOfStays?: number

}

const UserModel = getModelForClass(User);

export default UserModel;