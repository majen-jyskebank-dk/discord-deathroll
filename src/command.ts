import { Message } from 'discord.js'

export class Command {
    public name: string;
    public description: string;
    public execute: (message: Message, args: any) => any;
}
