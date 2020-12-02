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
		.setDescription('[Support Server](https://discord.gg/upx6SqG)\n[]')
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		message.channel.send(linksEmbed);
		} catch (error) {
			message.reply(config.error)
			console.error(error)
		}
	}
}
