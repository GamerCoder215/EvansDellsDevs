module.exports = {
	name: 'round',
	descriptin: 'Rounds an expression up, down, or normally.',
	education: true,
	aliases: ['rnd'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const math = require('mathjs')
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
		// Command Sequence
		const argsExpression = args.slice(1).join(' ')
		const expression = math.evaluate(argsExpression);
		try {
			if (!args[0]) {
				return message.channel.send(invalidArguments);
			} else {
				if (!args[1]) {
					return message.channel.send(invalidArguments)
				} else {
					if (args[0] === 'up') {
						const roundUp = Math.ceil(expression);
						const roundUpEmbed = new Discord.MessageEmbed()
						.setDescription(`\`${roundUp}\``)
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						message.channel.send(roundUpEmbed);
					} else if (args[0] === 'down') {
						const roundDown = Math.floor(expression);
						const roundDownEmbed = new Discord.MessageEmbed()
						.setDescritption(`\`${roundDown}\``)
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						message.channel.send(roundDownEmbed)
					} else if (args[0] === 'normal') {
						const round = Math.round(expression);
						const roundEmbed = new Discord.MessageEmbed()
						.setDescription(`\`${round}\``)
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						message.channel.send(roundEmbed)
					} else {
						return message.channel.send(invalidArguments);
					}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}