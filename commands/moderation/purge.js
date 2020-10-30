module.exports = {
	name: 'purge',
	description: 'Purges a certain amount of messages in a channel.',
	guildOnly: true,
	aliases: ['bulkdelete', 'prge'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
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
		// Invalid Number Embed
		const invalidNumber = new Discord.MessageEmbed()
		.setDescription(`Please enter a valid number between \`3\` and \`100\`.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
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
		// Get Channel from Mention Function
		function getID(mention) {
			if (!mention) return;
			if (mention.startsWith('<#') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<#>]/g, '')
				return (mentionID);
			} else return;
		}
		// Command Sequence
		try {
		if (isNaN(args[0]) || args[0] < 3 || args[0] > 99) {
			return message.channel.send(invalidNumber);
		} else {
			if (!args[1]) {
				if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(invalidPermissions);
				message.channel.bulkDelete(args[0], true)
				setTimeout(() => {
					message.channel.send(actionSucessful)
				}, 1500)
			} else {
				var purgedChannel = client.channels.cache.get(getID(args[1]));
				if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(invalidPermissions);
				purgedChannel.bulkDelete(args[0], true)
				setTimeout(() => {
					message.channel.send(actionSucessful);
				}, 1500)
			}
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}