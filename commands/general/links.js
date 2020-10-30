module.exports = {
	name: 'links',
	description: 'Gives some useful links for the bot.',
	aliases: ['l'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// Link Embed
		try {
		const linksEmbed = new Discord.MessageEmbed()
		.setTitle('Links')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription('🔹 Support Server: https://discord.gg/kFtBh9y\n🔹 Connor Corner: https://discord.gg/eHbv7kx\n🔹 Invite: https://discord.com/api/oauth2/authorize?client_id=759299909924421642&permissions=8&scope=bot\n🔹 Dashboard: *Coming Soon*')
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		message.channel.send(linksEmbed);
		} catch (error) {
			message.reply(config.error)
			console.error(error)
		}
	}
}
