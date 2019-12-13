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
            message.channel.send(`Please specify how much gold you want to bet (got ${args.length} arguments, expected 1).`);
            return;
        }

        if (isNaN(+args[0])) {
            message.channel.send(`Please specify how much gold you want to bet (${args[0]} is not a valid number).`);
            return;
        }

        const betAmount = Math.floor(+args[0]);

        if (betAmount <= 1)  {
            message.channel.send(`${message.author.toString()}, amount to small to bet.`);
            return;
        }

        let channel = await ChannelController.FindOrCreate({ channelId: message.channel.id });
        if (channel.currentGame != null) {
            const tillTimeout: number = 300000 - (new Date().getTime() - channel.currentGame.updated.getTime());

            if (tillTimeout > 0) {
                message.channel.send(`Looks like a game is already under way. Let the other players finish, or wait for the game to time out (time out in ${Math.floor(tillTimeout / 1000)} seconds).`);
                return;
            }
        }

        const user = await UserController.FindOrCreate({
            userId: message.author.id,
            userTag: message.author.toString(),
            userName: message.author.username,
        });

        if (user.gold < betAmount) {
            message.channel.send(`${message.author.toString()}, you don't have enough gold to place a bet of ${betAmount}. Do !bank to check how much gold you have.`);
            return;
        }

        const game = await GameController.Create({ nextPlayer: user, bet: betAmount });
        channel = await ChannelController.SetGame({ channelId: channel.channelId, currentGame: game });

        message.channel.send(`${message.author.toString()} placed a bet of ${betAmount}. Do !roll to accept.`);
    }
}
