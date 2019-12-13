import { ICommand } from './interfaces/command.interface';
import mongoose from 'mongoose';
import * as schedule from 'node-schedule';
import * as Discord from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';
import UserContoller from './controllers/user.contoller';

let db: mongoose.Connection;
const client = new Discord.Client();
const dbPath = 'mongodb://localhost/discord-deathroll';
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

mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

db = mongoose.connection;

db.on('error', () => {
    console.log('Error occurred from MongoDB');
});

db.on('open', () => {
    console.log('Successfully connected to database!');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('commandsLoaded', () => {
    console.log('All commands loaded!');
});

client.on('message', (message) => {
    if (!message.content.startsWith('!')) {
        return;
    }

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands.has(command)) {
        commands.get(command).execute(message, args);
    }
});

schedule.scheduleJob('0 * * * * *', () => {
    UserContoller.GiveUsersGold({ condition: { gold: { $lt: 500 } }, gold: 10 });
});

client.login('TOKEN');
