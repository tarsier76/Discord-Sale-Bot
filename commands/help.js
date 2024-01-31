const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Lists the bot's commands and explains them."),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		// await interaction.reply(`These are the bot's commands: \n
		// /start : Start searching for any product or service. \n
		// /about : Gives information about how the bot works and the kind of results it returns.
		// `);

		const helpEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle("Get the Best Deals with Sale Bot's Commands:")
		.addFields(
			{ name: '/start', value: 'Begin your shopping journey by searching for any product or service.' },
		)
		.addFields(
			{ name: '/about', value: 'Get to know Sale Bot better with information about how it works and what kind of results you can expect.' },
		)
		.addFields(
			{ name: '\n\n', value: "Need help? Have a suggestion? Join our [Support Server](https://discord.gg/a34z2Pj9jU) for assistance and to share your thoughts with us."}
		)

		await interaction.reply({ embeds: [helpEmbed]});
	},

	
};