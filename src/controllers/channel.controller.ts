import Channel, { IChannel } from '../models/channel.model';

interface IFindOrCreate {
    channelId: IChannel['channelId'];
}

interface ISetGame {
    channelId: IChannel['channelId'];
    currentGame: IChannel['currentGame'];
}

interface IUnsetGame {
    channelId: IChannel['channelId'];
}

async function FindOrCreate({ channelId }: IFindOrCreate): Promise<IChannel> {
    let channel: IChannel = await Channel.findOne({ channelId })
    .populate({ path: 'currentGame', populate: { path: 'currentPlayer' } })
    .populate({ path: 'currentGame', populate: { path: 'nextPlayer' } })
    .exec();

    if (channel === null) {
        channel = await Channel.create({ channelId });
    }

    return channel;
}

async function SetGame({ channelId, currentGame }: ISetGame): Promise<IChannel> {
    return await Channel.findOneAndUpdate({ channelId }, { currentGame: currentGame.id }, { new: true });
}

async function UnsetGame({ channelId }: IUnsetGame): Promise<IChannel> {
    return await Channel.findOneAndUpdate({ channelId }, { currentGame: null }, { new: true });
 }

export default {
    FindOrCreate,
    SetGame,
    UnsetGame,
};
