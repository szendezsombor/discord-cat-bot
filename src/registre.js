const { REST, Routes } = require('discord.js');
const { token } = require('./config.json');


const commands = [
    {
        name: 'cat-meme',
        description: 'It send you a random cat meme, to be happy. :)',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("1091650576279945227"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();