import mongoose, { Schema, Document } from 'mongoose';
import { IGame } from './game.model';

export interface IChannel extends Document {
    channelId: string;
    currentGame: IGame;
}

const ChannelSchema: Schema = new Schema({
    channelId: {
        type: String,
        required: true,
        unique: true,
    },
    currentGame: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        default: null,
    },
});

export default mongoose.model<IChannel>('Channel', ChannelSchema);
