module.exports = {
	name: 'rename',
	description: 'Rename a value in database',
	database: true,
	aliases: ['ren', 'name'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const db = require('quick.db');
		// Tables
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		// Embeds
		// Invalid Args Embed
  	const invalidArguments = new Discord.MessageEmbed()
  	.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
  	.setColor(config.red)
  	.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  	.setFooter(config.name, config.icon)
  	.setTimestamp();
		// Not Owner
		const invalidUser = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you need to be the owner to execute this command!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) return message.channel.send(invalidArguments);
			if (db.get(`value_${args[0]}_owner`) !== message.author.id) return message.channel.send(invalidUser);
			message.delete({ reason: 'Secrecy' });
			const newValue = args.slice(1).join(' ');
			if (!newValue) return message.channel.send(invalidArguments)
			db.set(`value_${args[0]}`, newValue);
			const renameEmbed = new Discord.MessageEmbed()
			.setDescription(`Code \`${args[0]}\` was sucessfully renamed!`)
			.setFooter(config.name, config.icon)
			.setColor(config.gold)
			.setTimestamp();
			message.channel.send(renameEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}