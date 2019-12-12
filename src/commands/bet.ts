import { ICommand } from '../interfaces/command.interface';
import { Message } from 'discord.js';
import UserController from '../controllers/user.contoller';
import ChannelController from '../controllers/channel.controller';
import GameController from '../controllers/game.controller';

export class Bet implements ICommand {
    public name = 'bet';
    public description: 'Bets a given amount. First to reply with /roll accepts and plays agains better. E.g. !bet 500';
    public async execute(message: Message, args: any) {
        if (args.length !== 1) {
            message.channel.send(`Expected 1 argument, got ${args.length}`);
            return;
        }

        if (isNaN(+args[0])) {
            message.channel.send('Argument is not a number');
            return;
        }

        const betAmount = +args[0];
        const user = await UserController.FindOrCreate({ userId: message.author.id });
        let channel = await ChannelController.FindOrCreate({ channelId: message.channel.id });

        if (channel.currentGame != null) {
            const tillTimeout: number = 300000 - (new Date().getTime() - channel.currentGame.updated.getTime());

            if (tillTimeout > 0) {
                message.channel.send(`Looks like a game is already under way. Let the other players finish, or wait for the game to time out (time out in ${Math.floor(tillTimeout / 1000)} seconds)`);
                return;
            }
        }

        const game = await GameController.Create({ betBy: user, bet: +args[0] });
        channel = await ChannelController.SetGame({ channelId: channel.channelId, currentGame: game });

        message.channel.send(`${message.author.toString()} placed a bet of ${betAmount}. Will anyone accept?`);
    }
}
