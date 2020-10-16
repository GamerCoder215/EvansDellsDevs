module.exports = {
	name: 'absolute',
	description: 'Returns the absolute value of an expression.',
	education: true,
	aliases: ['abs', 'absl'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		const math = require('mathjs');
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
			const argsSlice = args.slice(0).join(' ');
			const expression = math.evaluate(argsSlice);
			const absoluteEmbed = new Discord.MessageEmbed()
			.setDescription(`Your answer is ${Math.abs(expression)}`)
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(absoluteEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}