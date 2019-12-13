import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    userTag: string;
    userName: string;
    gold: number;
    won: number;
    lost: number;
}

const UserSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userTag: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    gold: {
        type: Number,
        required: true,
        default: 500,
    },
    won: {
        type: Number,
        default: 0,
    },
    lost: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model<IUser>('User', UserSchema);
