module.exports = {
	name: 'shout',
	description: 'Edits a message to make it look shouted.',
	aliases: ['sh', 'sht'],
	guildOnly: true,
	async run(client, message, args) {
		message.delete() // Deletes message once used (to make it look shouted)
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// Command Sequence
		try {
			var newMessage = args.slice(0).join(' ')
			var shoutMessage = '__**📣' + newMessage.toUpperCase() + '📣**__';
			// Embed
			const shoutEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setDescription(shoutMessage)
			.setColor('#7df9ff')
			.setTimestamp();
			message.channel.send(shoutEmbed);
		} catch (error) {
			console.error(error)
			message.reply(config.error);
		}
	}
}