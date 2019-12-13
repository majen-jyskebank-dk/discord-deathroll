import { ICommand } from '../interfaces/command.interface';
import { Message } from 'discord.js';
import UserController from '../controllers/user.contoller';

export class Bank implements ICommand {
    public name = 'bank';
    public description = 'Shows how much gold you\'ve got in your bank. E.g. !bank';

    public async execute(message: Message, args: any) {
        const user = await UserController.FindOrCreate({
            userId: message.author.id,
            userTag: message.author.toString(),
            userName: message.author.username,
        });
        message.channel.send(`${user.userTag}, you've got ${user.gold} gold in your bank.`);
    }
}
