module.exports = {
	name: 'setafk',
	description: 'Sets the AFK channel, with option of timeout.',
	guildOnly: true,
	aliases: ['setafkchannel', 'afkchannel'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// In-App Dependencies
		const guild = message.guild;
		// Tables
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
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
		// Embeds
		// Same Channel
		const sameChannel = new Discord.MessageEmbed()
		.setDescription(`The channel you have given is already the AFK Channel of the server!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Permissions
		const invalidPermissions = new Discord.MessageEmbed()
		.setDescription(invalidPermissionMessages[Math.floor(Math.random() * 6)])
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		// Action Sucessful
		const actionSucessful = new Discord.MessageEmbed()
		.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
		.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Command Sequence
		try {
			const oldAFKChannel = guild.afkChannel;
			const newAFKChannel = client.channels.cache.get(args[0]);
			if (isNaN(args[0])) return message.channel.send(invalidArguments);
			if (oldAFKChannel === newAFKChannel) return message.channel.send(sameChannel);
			if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(invalidPermissions);
			if (!args[0]) return message.channel.send(invalidArguments);
			if (!args[1]) {
			guild.edit({
				afkChannel: newAFKChannel
			})
			message.channel.send(actionSucessful);
			} else {
				if (isNaN(args[1])) return message.channel.send(invalidArguments);
				if (args[1] == '1') {
					guild.edit({
					afkChannel: newAFKChannel,
					afkTimeout: 60
				})
				} else if (args[1] == '5') {
				guild.edit({
					afkChannel: newAFKChannel,
					afkTimeout: 300
				})
				} else if (args[1] == '15') {
					guild.edit({
					afkChannel: newAFKChannel,
					afkTimeout: 900
				})
				} else if (args[1] == '30') {
					guild.edit({
					afkChannel: newAFKChannel,
					afkTimeout: 1800
				})
				} else if (args[1] == '60') {
					guild.edit({
					afkChannel: newAFKChannel,
					afkTimeout: 3600
				})
				} else {
					const invalidTimeout = new Discord.MessageEmbed()
					.setDescription(`You have entered an invalid number! Please enter a valid time: 1 minute (1), 5 minutes (5), 15 minutes (15), 30 minutes (30), or 1 hour (60)`)
					.setColor(config.red)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					return message.channel.send(invalidTimeout);
				}
				message.channel.send(actionSucessful);
			}
		} catch (error) {
			console.error(error)
			message.reply(config.error);
		}
	}
}