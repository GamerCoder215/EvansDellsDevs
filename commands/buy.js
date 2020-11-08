module.exports = {
	name: 'buy',
	description: 'Buys a certain item from shop.',
	aliases: ['purchase'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		const db = require('quick.db');
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, 	you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const invalidCurrency = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, you do not have enough messages to buy this item!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const alreadyBought = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`You have already bought this item!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const invalidCooldown = new Discord.MessageEmbed()
		.setTitle(`Error`)
		.setDescription(`You have to wait a little more to use this command, ${message.author.username}!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const sucessPurchase = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`You have sucessfully purchased this item!`)
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
				return message.channel.send(invalidArgs);
			} else {
				if (args[0] === 'write') {
					if (db.get(`guild_messages_${message.author.id}_count`) < 300) {
						return message.channel.send(invalidCurrency)
					} else if (db.get(`guild_purchases_${message.author.id}_write`) === 'true') {
						return message.channel.send(alreadyBought);
					} else {
						db.set(`guild_purcahses_${message.author.id}_write`, true);
						message.channel.send(sucessPurchase);
					}
				} else if (args[0] === 'study') {
					const studyCooldown = new Set();
					if (db.get(`guild_messages_${message.author.id}_count`) < 600) {
						return message.channel.send(invalidCurrency)
					} else if (studyCooldown.has(message.author.id)) {
						return message.channel.send(invalidCooldown);
					} else {
						const addMultiplyer = Math.random() * 3;
						db.add(`guild_messages_${message.author.id}_multiplyer`, addMultiplyer)
						db.subtract(`guild_messages_${message.author.id}_count`)
						// Embed
						const studySucessfulEmbed = new Discord.MessageEmbed()
						.setDescription(`Your multiplyer was sucessfully increased by \`${addMultiplyer}\`!`)
						.setColor(config.blue)
						.setTimestamp();
						message.channel.send(studySucessfulEmbed);
						// Cooldown Set
						studyCooldown.add(message.author.id);
						setTimeout(() => {
							studyCooldown.delete(message.author.id);
						}, 1000 * 60 * 60 * 24)
					}
				} else if (args[0] === 'chop') {
					const chopCooldown = new Set();
					const writeRequired = new Discord.MessageEmbed()
					.setTitle('Error')
					.setDescription(`You need to have write purchased to use chop!`)
					.setColor(config.red)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					if (db.get(`guild_messages_${message.author.id}_count`) < 2000) {
						return message.channel.send(invalidCurrency);
					} else if (db.get(`guild_purchases_${message.author.id}_write`) === 'false') {
						return message.channel.send(writeRequired);
					} else if (chopCooldown.has(message.author.id)) {
						return message.channel.send(invalidCooldown);
					} else {
						const treesCut = Math.random() * 5
						const writeMultiplyer = Math.floor(treesCut * 1.5)
						db.subtract(`guild_messages_${message.author.id}_count`, 2000)
						db.add(`guild_purcahses_${message.author.id}_write_multiplyer`, writeMultiplyer)
						const chopSucessfulEmbed = new Discord.MessageEmbed()
						.setDescription(`You successfully chopped down \`${treesCut}\` tree(s) and got \`${writeMultiplyer}\` pieces of paper!`)
						.setColor(config.gold)
						.setTimestamp();
						message.channel.send(chopSucessfulEmbed);
						chopCooldown.add(message.author.id);
						setTimeout(() => {
							chopCooldown.delete(message.author.id);
						}, 1000 * 60 * 60 * 48)
					}
			} else if (args[0] === 'upgrade') {
				var upgradeCost = 50 * db.get(`guild_messages_${message.author.id}_multiplyer`)
				if (db.get(`guild_messages_${message.author.id}_count`) < upgradeCost) {
					const notEnoughMoney = new Discord.MessageEmbed()
					.setDescription(`Sorry ${message.author.username}, you need \`${upgradeCost}\` messages to upgrade your multiplyer!`)
					.setColor(config.pink)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					return message.channel.send(notEnoughMoney);
				} else {
					db.add(`guild_messages_${message.author.id}_multiplyer`, 1);
					db.subtract(`guild_messages_${message.author.id}_count`, upgradeCost);
					const upgradeSucessful = new Discord.MessageEmbed()
					.setDescription(`You have sucessfully upgraded your multiplyer to level \`${db.get(`guild_messages_${message.author.id}_multiplyer`)}\`!`)
					.setColor(config.pink)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(upgradeSucessful);
				}
			} else {
				return message.channel.send(invalidArgs);
			}
		}
	} catch (error) {
		console.error(error);
		message.reply(config.error);
		}
	}
}