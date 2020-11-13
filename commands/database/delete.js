module.exports = {
	name: 'delete',
	description: 'Deletes a value in a database.',
	database: true,
	aliases: ['del'],
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
			var values = 0;
			db.delete(`value_${args[0]}`);
			values++;
			db.delete(`value_${args[0]}_owner`);
			values++;
			if (db.get(`password_${args[0]}`)) {
				db.delete(`password_${args[0]}`);
				values++;
			}
			if (db.get(`password_${args[0]}_2`)) {
				db.delete(`password_${args[0]}_2`);
				values++;
			}
			if (db.get(`protection_${args[0]}`)) {
				db.delete(`protection_${args[0]}`);
				values++;
			}
			const deleteEmbed = new Discord.MessageEmbed()
			.setDescription(`Deleted \`${values}\` sets of data in code \`${args[0]}\``)
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(deleteEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}