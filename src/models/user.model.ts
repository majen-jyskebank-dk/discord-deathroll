import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    userTag: string;
    gold: number;
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
    gold: {
        type: Number,
        required: true,
        default: 500,
    },
});

export default mongoose.model<IUser>('User', UserSchema);
