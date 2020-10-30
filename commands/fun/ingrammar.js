module.exports = {
	name: 'ingrammar',
	description: 'Removes vowels and y\'s in a message.',
	aliases: ['ing', 'badgrammar', 'badg'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// Command Sequence
		try {
		var newMessage = args.slice(0).join(' ');
		var inGrammarMessage = newMessage.replace(/[aeiouy]/g, '');
		// Embed
		const inGrammarEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(inGrammarMessage)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.channel.send(inGrammarEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}