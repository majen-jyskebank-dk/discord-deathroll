import { ICommand } from './command';
import * as Discord from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';

const client = new Discord.Client();
const commands = new Map<string, ICommand>();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter((file) => file.endsWith('.js'));

commandFiles.forEach((file, index) => {
    import(`./commands/${file}`).then((command) => {
        let commandKey: string;

        Object.keys(command).forEach((key) => {
            commandKey = key;
        });

        const commandInstance: ICommand = Object.create(new command[commandKey]());

        commands.set(commandInstance.name, commandInstance);
        console.log(`Loaded command: ${commandInstance.name}`);

        if (index === commandFiles.length - 1) {
            client.emit('commandsLoaded');
        }
    });
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} - ready!`);
});

client.on('commandsLoaded', () => {
    console.log('All commands loaded');
});

client.on('message', (message) => {
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands.has(command)) {
        commands.get(command).execute(message, args);
    }
});

client.login('TOKEN');
