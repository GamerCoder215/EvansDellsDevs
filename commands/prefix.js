module.exports = {
	name: 'prefix',
	description: 'Sets a prefix.',
	aliases: ['p', 'pr'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord + Quick.DB
		const Discord = require('discord.js');
		const db = require('quick.db');
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
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true }))
		.setFooter('Connor', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		const invalidPermissions = new Discord.MessageEmbed()
		.setDescription(invalidPermissionMessages[Math.floor(Math.random() * 6)])
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true }))
		.setFooter('Connor', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		const samePrefix = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you already have that as your prefix!`)
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true }))
		.setFooter('Connor', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		const tooManyArguments = new Discord.MessageEmbed()
		.setDescription(`Your prefix has too many arguments, ${message.author.username}! You must have below 3 arguments for you prefix!`)
		.setColor('#ff0000')
		.setAuthor('', `${message.author.username}`)
		.setFooter('Connor', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		const actionSucessful = new Discord.MessageEmbed()
		.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
		.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true }))
		.setColor('#D8D52B')
		.setFooter('Connor', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		try {
			// Command Sequence
			if (!message.member.hasPermission('MANAGE_SERVER')) {
				return message.channel.send(invalidPermissions);
			} else if (!args[0]) {
				return message.channel.send(invalidArguments);
			} else if (args[0].length > 3) {
				return message.channel.send(tooManyArguments);
			} else if (args[0] === db.get(`guild_${message.guild.id}_prefix`)) {
				return message.channel.send(samePrefix);
			} else {
			db.delete(`guild_${message.guild.id}_prefix`);
			db.set(`guild_${message.guild.id}_prefix`, args[0]);
			return message.channel.send(actionSucessful)
			}
		} catch (error) {
			console.error(error)
			message.reply(`I\'m sorry, I had an internal error. Paste this error in the support server: \"${error}\"`)
		}
	}
}
