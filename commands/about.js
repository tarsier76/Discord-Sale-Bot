const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn all about Sale Bot and how it works.'),
    async execute(interaction) {
        // await interaction.reply({ content: "Sale Bot returns any product or service that is on sale in any country, so you can search in any language. The results are displayed privately so only you can see them. When there is no reduced price for the item, regular-priced products will be displayed instead. If items other than those you searched for are returned it's because the bot doesn't have the reach yet, so try again later."});

        const aboutEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Sale Bot - Your Personal Shopping Assistant:')
		.setDescription(`Sale Bot helps you find the best deals and discounts on products and services from around the world. Simply search for what you're looking for in any language, and Sale Bot will return a list of available sales and discounts from official websites, all displayed privately for your convenience.

If your desired item is not on sale, don't worry! Sale Bot still shows regular-priced products so you can compare and make the best decision, and if you don't find what you're looking for, try again later as the bot is constantly improving.`)

		await interaction.reply({ embeds: [aboutEmbed]});
    }
}