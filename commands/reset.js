module.exports = {
	name: 'reset',
	description: 'Resets a user\'s leveling status.',
	aliases: ['clear', 'rst', 'clr'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		const db = require('quick.db')
		// Get ID from mention function
		function getIDFromMention(mention) {
			if (!mention) return;
			if (mention.startsWith('<@') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<@!>]/g, '');
				return (mentionID);
			} else return;
		}
		// Invalid Perms Embed
		const invalidPerms = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have permission to use this command.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, 	you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!message.member.hasPermission('MANAGE_SERVER') && !message.member.roles.has(config.permrole)) {
				return message.channel.send(invalidPerms)
			} else {
				if (!args[0] && !args[0].startsWith('<@') && !args[0].endsWith('>')) {
					return message.channel.send(invalidArgs)
				} else {
				const target = client.users.cache.get(getIDFromMention(args[0]));
				const targetID = getIDFromMention(args[0]);
				const reason = args.slice(1).join(' ')
				// Resets
				db.set(`guild_messages_${targetID}_count`, 0)
				db.set(`guild_messages_${targetID}_count_permanent`, 0)
				db.set(`guild_rebirths_${targetID}`, 0)
				db.set(`guild_rebirths_${targetID}_permanent`, 0)
				db.set(`guild_prestiges_${targetID}`, 0)
				db.set(`guild_prestiges_${targetID}_permanent`, 0)
				db.set(`guild_messages_${targetID}_multiplyer`, 1)
				db.set(`guild_puchases_${targetID}_write`, 'false')
				db.set(`guild_purchases_${targetID}_write_multiplyer`, 3)
				// Sucess Embed
				const successEmbed = new Discord.MessageEmbed()
				.setDescription(`User <@${target.id}> was sucessfully reset for \"${reason}\"`)
				.setColor(config.blue)
				.setTimestamp();
				message.channel.send(successEmbed)
				// Log Sent
				if (!reason) {
					const userResetnoReason = new Discord.MessageEmbed()
					.setTitle(`User ${target.username} reset`)
					.setAuthor(target.username, target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
					.setDescription(`Moderator: <@${message.author.id}>\nReason: None Given.`)
					.setColor(config.red)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					client.channels.cache.get('764365687770578984').send(`<@${target.id}>`, userResetnoReason)
				} else {
				const userReset = new Discord.MessageEmbed()
				.setTitle(`User ${target.username} reset`)
				.setAuthor(target.username, target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(`Moderator: <@${message.author.id}>\nReason: ${reason}`)
				.setColor(config.red)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				client.channels.cache.get('764365687770578984').send(`<@${target.id}>`, userReset)
				}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}