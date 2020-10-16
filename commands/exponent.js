module.exports = {
	name: 'exponent',
	description: 'Pick a number to a certain power.',
	aliases: ['expnt', 'power'],
	education: true,
	async run(client, message, args) {
	// Discord, Config & NPM Dependencies
	const Discord = require('discord.js');
	const config = require('./command_config.json');
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
			return message.channel.send(invalidArguments);
		} else {
			if (!args[2] && !args[3]) {
				const twoPowerEmbed = new Discord.MessageEmbed()
				.setDescription(`Your answer is \`${Math.pow(args[0], args[1])}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(twoPowerEmbed);
			} else if (!args[3]) {
				const threePowerEmbed = new Discord.MessageEmbed()
				.setDescription(`Your answer is \`${Math.pow(Math.pow(args[0], args[1]), args[2])}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(threePowerEmbed);
			} else {
				const fourPowerEmbed = new Discord.MessageEmbed()
				.setDescription(`Your answer is \`${Math.pow(Math.pow(Math.pow(args[0], args[1]), args[2]), args[3])}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(fourPowerEmbed)
			}
		}
	}
	} catch (error) {
		console.error(error);
		message.reply(config.error);
	}
	}
}