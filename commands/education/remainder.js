module.exports = {
	name: 'remainder',
	description: 'Get a remainder of a number.',
	education: true,
	aliases: ['rmdr', 'leftovr'],
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
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
		// Command Sequence
		try {
			if (!args[0]) {
				return message.channel.send(invalidArguments);
			} else {
				if (!args[1]) {
					return message.channel.send(invalidArguments)
				} else {
					var remainder = args[0] % args[1];
					var number = Math.floor(args[0] / args[1])
					const remainderEmbed = new Discord.MessageEmbed()
					.setDescription(`Your answer is \`${number}\` remainder \`${remainder}\``)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(remainderEmbed);
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}