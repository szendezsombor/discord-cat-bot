import {Collection, Message} from "discord.js";

const {Client, Events, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');
const path = require('path');
const fs = require('fs');

const client = new Client({intents: Object.values(GatewayIntentBits)});

client.once(Events.ClientReady, (c: any) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.on(Events.InteractionCreate, async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    console.log(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});

// Log in to Discord with your client's token
client.login(token);