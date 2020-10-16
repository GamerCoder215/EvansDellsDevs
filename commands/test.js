module.exports = {
	name: 'test',
	description: 'Tests if an expression is a certain value.',
	education: true,
	aliases: ['tst', 'check', 'chk'],
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
		// True Embed
		const trueEmbed = new Discord.MessageEmbed()
		.setDescription(`Your answer is \`true\``)
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// False Embed
		const falseEmbed = new Discord.MessageEmbed()
		.setDescription(`Your answer is \`false\``)
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Is Prime function
		function isPrime(num) {
			for(var i = 2; i < num; i++)
			if(num % i === 0) return false;
			return num > 1;
		}
		// Command Sequence
		try {
		const expression = args.slice(1).join(' ')
		if (!args[0]) {
			return message.channel.send(invalidArguments);
		} else {
			if (!expression) {
				return message.channel.send(invalidArguments)
			} else {
				if (args[0] === 'zero') {
					var zeroEvaluation = math.evaluate(expression);
					if (zeroEvaluation === 0) {
						return message.channel.send(trueEmbed)
					} else {
						return message.channel.send(falseEmbed)
					}
				} else if (args[0] === 'prime') {
					var primeEvaluation = math.evaluate(expression);
					if (isPrime(primeEvaluation)) {
						return message.channel.send(trueEmbed)
					} else {
						return message.channel.send(falseEmbed)
					}
				} else if (args[0] === 'negative') {
					var negativeEvaluation = math.evaluate(expression).toString();
					if (negativeEvaluation.startsWith('-')) {
						return message.channel.send(trueEmbed);
					} else {
						return message.channel.send(falseEmbed);
					}
				} else if (args[0] === 'positive') {
					var positiveEvaluation = math.evaluate(expression).toString();
					if (!positiveEvaluation.startsWith('-') && !positiveEvaluation === '0') {
						return message.channel.send(trueEmbed);
					} else {
						return message.channel.send(falseEmbed);
					}
				} else if (args[0] === 'integer') {
					var integerEvaluation = math.evaluate(expression).toString();
					if (!integerEvaluation.includes('.')) {
						return message.channel.send(trueEmbed);
					} else {
						return message.channel.send(falseEmbed);
					}
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