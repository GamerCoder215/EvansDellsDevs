module.exports = {
	name: 'help',
	description: 'Give a help message.',
	aliases: ['h'],
	async run(client, message, args) {
		// Discord + Prefix
		const Discord = require('discord.js');
		const prefix = require('./prefix.js')
		// Tables
		var greetings = [
			`Hiya ${message.author.username}, I\'m Connor! Here's a little help with my modules:`,
			`Hey there ${message.author.username}, my name is Connor. Here\'s my help page:`,
			`Hey ${message.author.username}, Connor here. I\'m gonna give you a help message, that says:`,
			`Hi ${message.author.username}, my name is Connor. I\'m going to give you my help message now:`,
			`Connor is here, ${message.author.username}:tada:! Here\'s my help message:`
		]
		const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\``)
		.addFields(
			{ name: '📓General', value: `\`${prefix}help general\`\n\n`, inline: true },
			{ name: '', value: ''}
		)
		.setColor('#D8D52B')
		.setTimestamp();
	}
}
