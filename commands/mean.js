module.exports = {
	name: 'mean',
	description: 'Find the mean of a set of numbers',
	education: true,
	aliases: ['mn', 'average', 'avg'],
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
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		try {
			var numbers = args.slice(0).join(' ')
			// Finding the Mean
			var numberCount = numbers.replace(/[ ]/g, '').length(); // Replaces all the spaces with nothing, then gets the length
			var numberAdd = math.evaluate(numbers.replace(/[ ]/g, ' + ') * 1) // Replaces the spaces with +'s, then evaluates it
			var mean = (numberAdd * 1) / (numberCount * 1); // * 1 is there in case they turn out strings
			const meanEmbed = new Discord.MessageEmbed()
			.setDescription(`The mean is \`${mean}\`.`)
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(meanEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}
