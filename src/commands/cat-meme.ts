const { getRandomCatMeme } =  require("../cat-memes/cat-memes");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat-meme')
        .setDescription('It send you a random cat meme, to be happy. :)'),
    async execute(interaction: any) {
        await interaction.reply({
            files: [
                {
                    attachment: await getRandomCatMeme()
                }
            ]
        })
    },
};