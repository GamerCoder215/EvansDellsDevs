module.exports = {
	name: 'shop',
	description: 'View the shop.',
	aliases: ['store', 'shp', 'stre'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, 	you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
				const shopEmbed = new Discord.MessageEmbed()
				.setTitle('Shop')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.addFields(
					{ name: `**Tools**`, value: '\`?shop tools\`'},
				)
				.setColor(config.blue)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(shopEmbed);
			} else {
				if (args[0] === 'tools') {
					const shopToolsEmbed = new Discord.MessageEmbed()
					.setTitle('Shop | Tools')
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true,}))
					.setDescription(`\`\`\`yaml\n?buy <item>\`\`\``)
					.addFields(
						{ name: `Write | \`400 messages\``, value: `Allows you to use the command ?write, which imitates you writing a message and grants you a certain amount of messages. (Usage: Every 12 hours.;Command Cost: 200 messages.)`},
						{ name: `Study | \`700 messages\``, value: `Lets you study words and grants you more messages per message sent! (Usage: Every 24h.)`},
						{ name: `Chop | \`3,000 messages\``, value: `Increases paper count by chopping trees and increases max value of messages from write. (Requires: Write.; Usage: Every 48h.)`},
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(shopToolsEmbed);
				} else {
					return message.channel.send(invalidArgs);
				}
			}
		} catch (error) {
			console.error(error);
			messsage.reply(config.error);
		}
	}
}