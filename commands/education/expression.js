module.exports = {
	name: 'expression',
	description: 'Evaluate an expression.',
	education: true,
	aliases: ['exp', 'express'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const math = require('mathjs');
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
		const expression = args.slice(0).join(' ')
		if (!expression) {
			return message.channel.send(invalidArguments);
		} else {
			var expressionAnswer = math.evaluate(expression);
			const expressionEmbed = new Discord.MessageEmbed()
			.setDescription(`Your answer is \`${expressionAnswer}\``)
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(expressionEmbed);
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}