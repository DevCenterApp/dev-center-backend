import { prop, getModelForClass } from '@typegoose/typegoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
}

class User {
    @prop({ required: true })
    public username! : string;

    @prop({ required: true, unique: true })
    public email! : string;

    @prop({ required:true })
    public password! : string;
}

export default getModelForClass(User, {
    schemaOptions: {
        timestamps: true
    }
});