module.exports = {
	name: 'function',
	description: 'Does a function',
	aliases: ['func', 'fnction', 'fn'],
	education: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dependenices
		const Discord = require('discord.js');
		const config = require('../command_config.json');
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
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
				return message.channel.send(invalidArguments)
			} else {
				if (!args[1]) {
					return message.channel.send(invalidArguments)
				}
				if (args[0] === 'tan') {
					const tanEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.tan(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(tanEmbed)
				} else if (args[0] === 'atan') {
					const atanEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.atan(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(atanEmbed)
				} else if (args[0] === 'sin') {
					const sinEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.sin(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(sinEmbed)
				} else if (args[0] === 'asin') {
					const asinEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.asin(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(asinEmbed)
				} else if (args[0] === 'cos') {
					const cosEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.cos(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(cosEmbed)
				} else if (args[0] === 'acos') {
					const acosEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.acos(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(acosEmbed)
				} else if (args[0] === 'log') {
					const logEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.log(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(logEmbed)
				} else if (args[0] === 'acosh') {
					const acoshEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.acosh(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(acoshEmbed)
				} else if (args[0] === 'acot') {
					const acotEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.acot(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(acotEmbed)
				} else if (args[0] === 'cot') {
					const cotEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.cot(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(cotEmbed)
				} else if (args[0] === 'coth') {
					const cothEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.coth(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(cothEmbed)
				} else if (args[0] === 'sinh') {
					const sinhEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.sinh(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(sinhEmbed)
				} else if (args[0] === 'csc') {
					const cscEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.csc(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(cscEmbed)
				} else if (args[0] === 'csch') {
					const cschEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.csch(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(cschEmbed)
				} else if (args[0] === 'sec') {
					const secEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.sec(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(secEmbed)
				} else if (args[0] === 'acsc') {
					const acscEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.acsc(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(acscEmbed)
				} else if (args[0] === 'acsch') {
					const acschEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.acsch(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(acschEmbed)
				} else if (args[0] === 'asec') {
					const asecEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.asec(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(asecEmbed)
				} else if (args[0] === 'asech') {
					const asechEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.asceh(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(asechEmbed)
				} else if (args[0] === 'tanh') {
					const tanhEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.tanh(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(tanhEmbed)
				} else if (args[0] === 'log10') {
					const log10Embed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.log10(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(log10Embed)
				} else if (args[0] === 'cosh') {
					const coshEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.cosh(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(coshEmbed)
				} else if (args[0] === 'log2') {
					const log2Embed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.log2(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(log2Embed)
				} else if (args[0] === 'log1p') {
					const log1pEmbed = new Discord.MessageEmbed()
					.setColor(config.gold)
					.setDescription(`Your answer is \`${math.log1p(args[1])}\``)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(log1pEmbed)
				} else {
					return message.channel.send(invalidArguments);
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}