import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    username: string,
    email: string,
    password: string,
    encrypt: Function,
    validatePassword: Function
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
    methods: {
        async encrypt(value) {
            const salt = await bcrypt.genSalt(10);
        
            return bcrypt.hash(value, salt);
        },
        async validatePassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

export default model('User', UserSchema);