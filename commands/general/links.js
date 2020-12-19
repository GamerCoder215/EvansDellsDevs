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
		.setDescription('[Website](https://connorbot.cf)\n[Support Server](https://discord.gg/upx6SqG)\n[Documentation](https://docs.connorbot.cf)\n[Status](https://status.connorbot.cf)')
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.channel.send(linksEmbed);
		} catch (error) {
			message.reply(config.error)
			console.error(error)
		}
	}
}
