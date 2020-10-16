module.exports = {
	name: 'multiply',
	education: true,
	description: 'Multiply up to four given numbers',
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
			// Only #1 and #2 multiply
			if (!num3 && !num4) {
				// Not a Number Check
				if (isNaN(num1) || isNaN(num2)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var twoMultiply = num1 * num2
				const twoNumbersMultiply = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(twoMultiply)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(twoNumbersMultiply);
				}
				// #1, #2, and #3 multiply
			} else if (!num4) {
				// Not a number Check
				if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var threeMultiply = num1 * num2 * num3;
				const threeNumbersMultiply = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(threeMultiply)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(threeNumbersMultiply);
				}
				// All multiply
			} else {
				// Not a Number Check
				if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4)) {
					return message.channel.send(invalidArguments);
				} else {
				// Embed
				var fourMultiply = num1 * num2 * num3 * num4
				const fourNumberMultiply = new Discord.MessageEmbed()
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(fourMultiply)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(fourNumberMultiply);
				}
			}
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}