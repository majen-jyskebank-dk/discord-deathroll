import User, { IUser } from '../model/user.model';

interface IFindOrCreate {
    userId: IUser['userId'];
}

async function FindOrCreate({ userId }: IFindOrCreate): Promise<IUser> {
    let user: IUser = await User.findOne({ userId }).exec();

    if (user === null) {
        user = await User.create({ userId });
    }

    return user;
}

export default {
    FindOrCreate,
};
