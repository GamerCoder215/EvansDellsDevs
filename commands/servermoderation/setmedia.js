module.exports = {
	name: 'setmedia',
	description: 'Sets the media scan filter for your server.',
	guildOnly: true,
	aliases: ['setmed', 'setscan', 'setmediascan', 'setmedscanfilter', 'smed'],
	async run(client, message, args) {
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// In-App
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
		// Invalid Mod Level
		const invalidLevel = new Discord.MessageEmbed()
		.setDescription('Please set the media scan level to \`1\` (None), \`2\` (Members without Roles) or \`3\` (All). **1 and 2 are not available to Community Servers**.')
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
		try {
			 const features = guild.features;
			if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(invalidPermissions);
			if (isNaN(args[0])) return message.channel.send(invalidArguments);
			if (args[0] < 1 || args[0] > 3) return message.channel.send(invalidLevel);
			if (args[0] == 1 && features.includes('COMMUNITY')) return message.channel.send(invalidLevel);
			if (args[0] == 2 && features.includes('COMMUNITY')) return message.channel.send(invalidLevel);
			 if (args[0] == 1) {
				guild.setExplicitContentFilter("DISABLED")
			} else if (args[0] == 2) {
				guild.setExplicitContentFilter('MEMBERS_WITHOUT_ROLES')
			} else if (args[0] == 3) {
				guild.setExplicitContentFilter('ALL_MEMBERS');
			}
			message.channel.send(actionSucessful);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}