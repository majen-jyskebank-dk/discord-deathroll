import { ICommand } from '../command';
import { Message } from 'discord.js';

export class Roll implements ICommand {
    public name = 'roll';
    public description = 'lol';

    public execute(message: Message, args: any): void {
        if (args.length !== 1) {
            message.channel.send(`Expected 1 argument, got ${args.length}`);
            return;
        }

        if (isNaN(+args[0])) {
            message.channel.send('Argument is not a number');
            return;
        }

        const roll = Math.floor((Math.random() * (+args[0])) + 1);
        message.channel.send(`${message.author.toString()} rolled a ${roll}`);
    }
}

export function getCommand(): Roll {
    return new Roll();
}
