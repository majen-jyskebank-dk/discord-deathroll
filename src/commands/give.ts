import { ICommand } from '../interfaces/command.interface';
import { Message } from 'discord.js';
import UserController from '../controllers/user.controller';

export class Give implements ICommand {
    public name = 'give';
    public description = 'Give specified user specified amount of your gold';
    public async execute(message: Message, args: any) {
        if (args.length !== 2) {
            // Not enough arguments
            return;
        }

        if (isNaN(+args[1])) {
            // Give amount not a number
            return;
        }

        const suppliedReceiver: string = args[0].replace('!', '');
        const amount: number = args[1];

        if (amount < 1) {
            // Tried to give 0 or less gold
            return;
        }

        const sender = await UserController.FindOrCreate({
            userId: message.author.id,
            userTag: message.author.toString(),
            userName: message.author.username,
        });

        if (sender.gold < amount) {
            // Tried to send more gold than they have
            return;
        }

        if (message.author.toString() === suppliedReceiver) {
            message.channel.send(`${suppliedReceiver} gave ${amount} gold to **THE VOID**.`);
        }

        console.log(message.content);
    }
}
