module.exports = {
	name: 'write',
	description: 'Gets you messages by writing something.',
	aliases: ['wrt'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		const db = require('quick.db');
		// Write required embed
		const writeRequired = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`You need to have write purchased to use this command!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Not enough money
		const invalidCurrency = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, you do not have enough messages to buy this item!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Cooldown Wait
		const invalidCooldown = new Discord.MessageEmbed()
		.setTitle(`Error`)
		.setDescription(`You have to wait a little more to use this command, ${message.author.username}!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			const writeCooldown = new Set();
			if (db.get(`guild_purchases_${message.author.id}_write`) === 'false') {
				return message.channel.send(writeRequired);
			} else if (db.get(`guild_messages_${message.author.id}_count`) < 200) {
				return message.channel.send(invalidCurrency);
			} else if (writeCooldown.has(message.author.id)) {
				return
			} else {
				const writeAction = db.get(`guild_messages_${message.author.id}_multiplyer`) * db.get(`guild_purchases_${message.author.id}_write_multiplyer`) * 15
				db.add(`guild_message_${message.author.id}_count`, writeAction);
				const writeSucessful = new Discord.MessageEmbed()
				.setDescription(`You sucessfully wrote \`${writeAction}\` messages!`)
				.setColor(config.gold)
				.setTimestamp();
				message.channel.send(writeSucessful);
				writeCooldown.add(message.author.id);
				setTimeout(() => {
					writeCooldown.delete(message.author.id);
				}, 1000 * 60 * 60 * 12)
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}