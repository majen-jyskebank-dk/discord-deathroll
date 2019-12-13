import { ICommand } from '../interfaces/command.interface';
import { Message } from 'discord.js';
import User from '../controllers/user.contoller';

export class Scoreboard implements ICommand {
    public name = 'scoreboard';
    public description = 'Shows current scoreboard for all players globally.';
    public async execute(message: Message, args: any): Promise<any> {
        const users = await User.GetUsersOrderByGold();

        let scoreString = '```---------- Scoreboard ----------\n';

        users.forEach((user, index) => {
            scoreString += `${index + 1}. ${user.userName}    ${user.gold} gold    Wins: ${user.won}    Loses: ${user.lost}${index + 1 !== users.length ? '\n' : ''}`;
        });

        scoreString += '```';
        message.channel.send(scoreString);
    }
}
