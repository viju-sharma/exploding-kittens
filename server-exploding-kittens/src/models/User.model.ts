import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../utils/interfaces/database.interface';

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select : false
        },
        score : {
            type : Number,
            min : 0,
            default : 0,
            required : true
        }
        
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);