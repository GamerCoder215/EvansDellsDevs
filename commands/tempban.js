module.exports = {
	name: 'tempban',
	description: 'Temporarily bans a user.',
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dpendencies
		const Discord = require('discord.js');
		const config = require('./command_config.json');
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
		// Action Sucessful Embed
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
		// User Cannot be banned
		const cannotBan = new Discord.MessageEmbed()
		.setDescription(`This user cannot be temporarily banned.`)
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dyanmic: true, format: 'png', size: 1024}))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Get ID Function
		function getID(mention) {
			if (!mention) return;
			if (mention.startsWith('<') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<@!#&>]/g, '')
				return (mentionID);
			} else return;
		}
		// Command Sequence
		try {
			if (!message.member.hasPermission('BAN_MEMBERS')) {
				return message.channel.send(invalidPermissions);
			} else {
				var targetUser = client.users.cache.get(getID(args[0]))
				var target = guild.member(targetUser.id)
				if (!args[0]) {
					return message.channel.send(invalidArguments);
				} else {
					var reason = args.slice(2).join(' ');
					if (!reason) {
						return message.channel.send(invalidArguments);
					} else {
						target.ban({ reason: `${reason}`})
						message.channel.send(actionSucessful);
						target.send(`<@${targetUser.id}>You were temporarily banned in ${guild.name} for \`${args[1]}\` hour(s)!`)
						setTimeout(() => {
							guild.members.unban(target.id);
							target.send(`<@${targetUser.id}> You were unbanned after ${args[1]} hour(s)!`)
							message.author.send(`${target.name} was unbanned after ${args[1]} hour(s).`)
						}, 1000 * 60 * 60 * args[1]);
					}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}