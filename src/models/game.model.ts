import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IGame extends Document {
    currentPlayer: IUser;
    nextPlayer: IUser;
    previousRoll: number;
    bet: number;
    updated: Date;
}

const GameSchema: Schema = new Schema({
    currentPlayer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    nextPlayer: {
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
