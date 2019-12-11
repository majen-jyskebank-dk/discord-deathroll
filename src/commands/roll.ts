import { Command } from '../command';
import { Message } from 'discord.js';

export class Roll extends Command {
    constructor() {
        super();

        this.name = 'roll';
        this.description = 'lol';
        this.execute = (message: Message, args: any): void => {
            if (args.length <= 0) {
                throw new Error('Missing arguments');
            }

            if (isNaN(+args[0])) {
                throw new Error('Argument not a number');
             }

            const roll = Math.floor((Math.random() * (+args[0])) + 1);
            message.channel.send(`${message.author.toString()} rolled a ${roll}`);
        };
    }
}

export function getCommand(): Roll {
    return new Roll();
}
