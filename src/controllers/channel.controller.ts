import Channel, { IChannel } from '../model/channel.model';

interface IFindOrCreate {
    channelId: IChannel['channelId'];
}

interface ISetGame {
    channelId: IChannel['channelId'];
    currentGame: IChannel['currentGame'];
}

async function FindOrCreate({ channelId }: IFindOrCreate): Promise<IChannel> {
    let channel: IChannel = await Channel.findOne({ channelId }).populate('currentGame').exec();

    if (channel === null) {
        channel = await Channel.create({ channelId });
    }

    return channel;
}

async function SetGame({ channelId, currentGame }: ISetGame): Promise<IChannel> {
    return await Channel.findOneAndUpdate({ channelId }, { currentGame: currentGame.id });
}

export default {
    FindOrCreate,
    SetGame,
};
