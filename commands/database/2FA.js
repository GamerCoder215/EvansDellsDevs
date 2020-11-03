module.exports = {
	name: '2FA',
	description: 'Enables Two-Factor Authentication (2FA) of the value code.',
	database: true,
	guildOnly: true,
	aliases: ['2fa', 'twofactor', 'two-factor', 'twofactorauthentication', 'tfa', '2factir'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const db = require('quick.db');
		// In-App Dependencies
		const guild = client.guilds.cache.get(message.guild.id);
		// Tables
      // Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		var sucessMessages = [
			`Your action was sucessful, ${message.author.username}`,
			`${message.author.username}\'s action was sucessful.`,
			`Congradulations ${message.author.username}, your action was sucessful.`,
			`Excellent! ${message.author.username} had their action a sucess.`,
			`Connor found out about your action ${message.author.username}, \nand he helped it become a sucess.`
		]
    // Embeds
    // Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Action Sucessful Embed
    const actionSucessful = new Discord.MessageEmbed()
  	.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
  	.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  	.setColor(config.gold)
  	.setFooter(config.name, config.icon)
  	.setTimestamp();
		// Password Required
		const passwordRequired = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you need to enable password to set 2FA!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Get Channel or User ID Function
		function get2FAID(mention) {
			if (!mention) return;
			if (mention.startsWith('<@') && mention.endsWith('>')) {
				var mentionUserID = 'U' + mention.replace(/[<@!>]/g, '')
				return (mentionUserID);
			} else if (mention.startsWith('<#') && mention.endsWith('>')) {
				var mentionChannelID = 'C' + mention.replace(/[<#>]/g, '')
				return (mentionChannelID);
			} else return;
		}
		function get2FACode() {
			var code = codeGenerator.generate({
				length: 6,
				uppercase: false,
				lowercase: false,
				numbers: true,
				symbols: false
			})
			return (code);
		}
		// Command Sequence
		try {
		if (!args[0]) return message.channel.send(invalidArguments);
		if (!args[1]) return message.channel.send(invalidArguments);
		var twoFAPost = get2FAID(args[1]);
		if (db.get(`password_${args[0]}`) === null) return message.channel.send(passwordRequired)
		var ifUser = client.users.cache.get(twoFAPost);
		var ifChannel = client.channels.cache.get(twoFAPost);
		if (twoFAPost.startsWith('U') && !ifChannel) {
			var twoFADiscordUser = client.users.cache.get(twoFAPost.replace(/[U]/g, ''))
			var twoFAUser = guild.member(twoFADiscordUser)
			const twoFAUserAwaitEmbed = new Discord.MessageEmbed()
			.setDescription(`Hey there ${twoFADiscordUser.username}! User ${message.author.username}#${message.author.discriminator} has set your account as the 2FA account for code \`${args[0]}!\``)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setColor(config.blue)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			db.set(`password_${args[0]}_2`, `U${twoFADiscordUser.id}`)
			message.channel.send(actionSucessful)
			twoFAUser.send(twoFAUserAwaitEmbed);
		} else if (twoFAPost.startsWith('C') && !ifUser) {
			const cantSend = new Discord.MessageEmbed()
			.setDescription(`Sorry, but you do not have permission to send messages in this channel!`)
			.setColor(config.red)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			var guildMember = guild.member(message.author)
			var twoFAChannel = client.channels.cache.get(twoFAPost.replace(/[C]/g, ''))
			if (twoFAChannel === undefined) return message.channel.send(invalidArguments);
			if (!guildMember.permissionsIn(twoFAChannel).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return message.channel.send(cantSend);
			const twoFAChannelEmbed = new Discord.MessageEmbed()
			.setDescription(`User ${message.author.username}#${message.author.discriminator} has set this channel for 2FA of code \`${args[0]}\`!`)
			.setColor(config.gold)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			db.set(`password_${args[0]}_2`, `C${twoFAChannel.id}`)
			message.channel.send(actionSucessful)
			twoFAChannel.send(twoFAChannelEmbed);
		} else return message.channel.send(invalidArguments)
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}