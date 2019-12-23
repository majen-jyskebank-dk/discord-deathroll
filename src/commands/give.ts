import { ICommand } from '../interfaces/command.interface';
import { Message } from 'discord.js';
import UserController from '../controllers/user.controller';
import userController from '../controllers/user.controller';

export class Give implements ICommand {
    public name = 'give';
    public description = 'Give specified user specified amount of your gold';
    public async execute(message: Message, args: any) {
        if (args.length !== 2) {
            message.channel.send(`${message.author.toString()}, please specify how much gold you want to give, and tho whom you want to give it to (got ${args.length} arguments, expected 2).`);
            return;
        }

        if (isNaN(+args[1])) {
            message.channel.send(`${message.author.toString()}, please specify how much gold you want to give (${args[0]} is not a valid number).`);
            return;
        }

        const suppliedReceiver: string = args[0].replace('!', '');
        let amount: number = parseInt(args[1], 10);

        if (amount < 1) {
            message.channel.send(`${message.author.toString()}, amount to small to give.`);
            return;
        }

        if (amount % 1 !== 0) {
            amount = Math.floor(amount);
            message.channel.send(`${message.author.toString()}, looks like you accidentally specified a decimal number - I'm gonna round that down to ${amount} for you.`);
        }

        const sender = await UserController.FindOrCreate({
            userId: message.author.id,
            userTag: message.author.toString(),
            userName: message.author.username,
        });

        if (sender.gold < amount) {
            message.channel.send(`${sender.userTag}, you don't have enough gold int your bank, to give away ${sender.gold} gold.`);
            return;
        }

        if (sender.userTag === suppliedReceiver) {
            message.channel.send(`${suppliedReceiver} gave ${amount} gold to **THE VOID**.`);
            return;
        }

        const receiver = await UserController.Find({ userTag: suppliedReceiver });

        if (receiver == null) {
            message.channel.send(`${sender.userTag}, it doesn't look like the username you entered is a player yet (have them do !bank).`);
            return;
        }

        userController.SetGold({ userId: sender.userId, gold: sender.gold - amount });
        userController.SetGold({ userId: receiver.userId, gold: receiver.gold + amount});
        message.channel.send(`${sender.userTag}, you have given ${amount} gold to ${receiver.userTag}.`);
    }
}
