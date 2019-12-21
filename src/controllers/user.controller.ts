import User, { IUser } from '../models/user.model';

interface IFindOrCreate {
    userId: IUser['userId'];
    userTag: IUser['userTag'];
    userName: IUser['userName'];
}

interface ISetGold {
    userId: IUser['userId'];
    gold: IUser['gold'];
}

interface IGivePrice {
    winnerId: IUser['userId'];
    looserId: IUser['userId'];
    gold: number;
}

interface IGiveUsersGold {
    condition: any;
    gold: IUser['gold'];
}

async function FindOrCreate({ userId, userTag, userName }: IFindOrCreate): Promise<IUser> {
    let user: IUser = await User.findOne({ userId }).exec();

    if (user === null) {
        user = await User.create({ userId, userTag, userName });
    }

    // Retroactively add missing usernames to database.
    if (user.userName == null) {
        user = await User.findOneAndUpdate({ _id: user._id }, { userName }, { new: true });
    }

    return user;
}

async function SetGold({ userId, gold }: ISetGold): Promise<IUser> {
    return await User.findOneAndUpdate({ userId }, { gold }, { new: true });
}

async function GivePrice({ winnerId, looserId, gold }: IGivePrice): Promise<any> {
    await User.findOneAndUpdate({ userId: winnerId }, { $inc: { gold, won: 1 } }, { new: true });
    await User.findOneAndUpdate({ userId: looserId }, { $inc: { lost: 1 } });
}

async function GiveUsersGold({ condition, gold }: IGiveUsersGold): Promise<any> {
    await User.updateMany(condition, { $inc: { gold }});
}

async function GetUsersOrderByGold(): Promise<IUser[]> {
    return await User.find({ userName: { $exists: true } }).sort({ gold: 'desc' }).exec();
}

export default {
    FindOrCreate,
    SetGold,
    GivePrice,
    GiveUsersGold,
    GetUsersOrderByGold,
};
