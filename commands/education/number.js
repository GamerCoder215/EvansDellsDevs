module.exports = {
	name: 'number',
	description: 'Generate a random value between 2 numbers.',
	aliases: ['numg', 'gnum', 'num'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
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
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		// Command Sequence
		try {
		var minValue = Math.ceil(args[0]);
		var maxValue = Math.floor(args[1]);
		// Number Check
			// Not a number
		if (isNaN(minValue) || isNaN(maxValue)) {
			return message.channel.send(invalidArguments);
			// Min is greater than Max
		} else if (minValue > maxValue){
			return message.channel.send(invalidArguments);
		} else {
			// Random Number sequence
			// Embed
			const numberEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setDescription(`**${Math.floor(Math.random() * (maxValue - minValue) + minValue)}**`)
			.setColor(config.blue)
			.setFooter('ConnorBot', config.icon)
			.setTimestamp();
			message.channel.send(numberEmbed);
		}  
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}