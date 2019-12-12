import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IGame extends Document {
    betBy: IUser;
    acceptedBy: IUser;
    currentPlayer: IUser;
    previousRoll: number;
    bet: number;
    updated: Date;
}

const GameSchema: Schema = new Schema({
    betBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    acceptedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    currentPlayer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    previousRoll: {
        type: Number,
        required: true,
    },
    bet: {
        type: Number,
        required: true,
    },
    updated: {
        type: Date,
        required: true,
    },
});

export default mongoose.model<IGame>('Game', GameSchema);
