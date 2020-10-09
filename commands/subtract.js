module.exports = {
	name: 'subtract',
	description: 'Subtracts up to four given numbers',
	aliases: ['sub', 'subt'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('./command_config.json');
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
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
		var num1 = args[0];
		var num2 = args[1];
		var num3 = args[2];
		var num4 = args[3];
		// Required Arguments check
		if (!num1 && !num2) {
			return message.channel.send(invalidArguments);
		} else {
			// Only #1 and #2 subtract
			if (!num3 && !num4) {
				// Not a Number Check
				if (isNaN(num1) || isNaN(num2)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var twoSubtract = (num1 * 1) - (num2 * 1)
				const twoNumbersSubtract = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(twoSubtract)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(twoNumbersSubtract);
				}
				// #1, #2, and #3 subtract
			} else if (!num4) {
				// Not a number Check
				if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var threeSubtract = (num1 * 1) - (num2 * 1) - (num3 * 1);
				const threeNumbersSubtract = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(threeSubtract)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(threeNumbersSubtract);
				}
				// All subtract
			} else {
				// Not a Number Check
				if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var fourSubtract = (num1 * 1) - (num2 * 1) - (num3 * 1) - (num4 * 1)
				const fourNumberSubtract = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(fourSubtract)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(fourNumberSubtract);
				}
			}
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}