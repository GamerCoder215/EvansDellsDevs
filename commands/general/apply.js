module.exports = {
	name: 'apply',
	description: 'Learn about applying for free premium',
	aliases: ['freepremium', 'frpremium'],
	async run(client, message, args) {
		const Discord = require('discord.js');
		const config = require('../command_config.json');

		try {
			const premiumEmbed = new Discord.MessageEmbed()
			.setTitle('Free Premium')
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
			.setDescription('__Staff Members__\nFree Premium is eligible for **Regular Staff and higher**. Trial Staff are not eligible for free premium. Regular staff include Server Admins, Support Team, Server Managers and Newsletter Team. Staff that are eligible for premium must:\n— Be active for at least 1 month\n— Member of the server for at least 45 days.\n— Handled at least one issue correctly/helped one person correctly.\n— Contributed to any bots/game ideas.\nStaff should contact a Dev for more information or if they are interested.\n\n__Non-Staff Members__\nFree Premium is eligible to certain users who:\n— Own a bot listing website and need premium for testing (temporary)\n— Advertised/Sponsored any of the Bot\'s projects in the past\n— Donated money to any of our projects/games in the past.\nNon-Staff should DM TheRealGamerCoder#2640 (<@572173428086538270>) (DMs are open) for questions, concerns, or if you are interested.')
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(premiumEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}