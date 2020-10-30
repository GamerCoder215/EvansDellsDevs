module.exports = {
	name: 'cube',
	description: 'Cubes a number.',
	education: true,
	aliases: ['cbe'],
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js')
		const config = require('../command_config.json');
		// Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		try {
			if (!args[0]) {
				return message.channel.send(invalidArguments);
			} else {
				var cubedNumber = args[0] * args[0] * args[0]
				const cubedEmbed = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(`Your answer is \`${cubedNumber}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(cubedEmbed);
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}