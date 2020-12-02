module.exports = {
	name: 'unmutechannel',
	description: 'Unmutes a specified channel.',
	guildOnly: true,
	aliases: ['unchannelmute', 'unchannelm', 'unmutech', 'unchmute', 'uchmute'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const db = require('quick.db');
		// In-App Dependencies
		const guild = client.guilds.cache.get(message.guild.id);
		// Tables
		var invalidPermissionMessages = [
			`I\'m sorry ${message.author.username}, but you do not have permission to use this command.`,
			`Hey ${message.author.username}, you don\'t have the correct permissions to use this command!`,
			`Stop, you don\'t have the permission, ${message.author.username}`,
			`${message.author.username} can\'t use this command because he lacks the permissions to do so.`,
			`Get the permissions to use this command, ${message.author.username}`,
			`Connor found out you don\'t have the permissions, ${message.author.username}!`
		]
		var sucessMessages = [
			`Your action was sucessful, ${message.author.username}`,
			`${message.author.username}\'s action was sucessful.`,
			`Congradulations ${message.author.username}, your action was sucessful.`,
			`Excellent! ${message.author.username} had their action a sucess.`,
			`Connor found out about your action ${message.author.username}, \nand he helped it become a sucess.`
		]
		var invalidArgumentMessages = [
		`Sorry ${message.author.username}, you have provided invalid arguments.`,
		`Hey there ${message.author.username}! You have provided some invalid arguments.`,
		`Let's see ${message.author.username}, you have some invalid arguments.`,
		`Hey ${message.author.username}, you have invalid arguments!`,
		`Please provide some valid arguments, ${message.author.username}`
		]
		// Embeds
		const invalidPermissions = new Discord.MessageEmbed()
		.setDescription(invalidPermissionMessages[Math.floor(Math.random() * 6)])
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const actionSucessful = new Discord.MessageEmbed()
		.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
		.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Channel Isn't Muted
		const notMuted = new Discord.MessageEmbed()
		.setDescription('This channel isn\'t. Please use ?mutechannel <channel> [duration].')
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Get ID From Mention Function
		function getID(mention) {
			if (!mention) return;
			if (mention.startsWith('<') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<#@&!>]/g, '')
				return (mentionID);
			} else return (mention);
		}
		// Command Sequence
		try {
			if (!message.member.hasPermission('MANAGE_MESSAGES')) {
				return message.channel.send(invalidPermissions);
			} else {
				var mutedChannel = client.channels.cache.get(getID(args[0]))
				if (!args[0]) {
					return message.channel.send(invalidArguments)
				} else {
					if (db.get(`channel_${getID(args[0])}_muted`) === false) {
						return message.channel.send(notMuted);
					} else {
						if (!args[1]) {
						db.set(`channel_${getID(args[0])}_muted`, false)
						message.channel.send(actionSucessful);
						client.channels.cache.get(mutedChannel.id).send(`This channel was unmuted by ${message.author.username}.`)
						} else {
							db.set(`channel_${getID(args[0])}_muted`, false)
						message.channel.send(actionSucessful);
						client.channels.cache.get(mutedChannel.id).send(`This channel was muted for \`${args[1]} minutes\`by ${message.author.username}.`)
						setTimout(() => {
							db.set(`channel_${getID(args[0])}_muted`, true)
							client.channels.cache.get(mutedChannel.id).send(`This channel was re-muted after \`${args[1]} minutes.\``)
							}, 1000 * 60 * args[1]);
						}
					}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}