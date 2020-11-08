module.exports = {
	name: 'stats',
	description: 'Display stats based on messaging.',
	aliases: ['status', 'level', 'stts'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		const db = require('quick.db');
		// In-App Dependencies
		const guild = client.guilds.cache.get('761571644384346143');
		// Get User from Mention function
		function getIDFromMention(mention) {
			if (!mention) return;
			if (mention.startsWith('<@') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<@!>]/g, '')
				return (mentionID);
			} else return;
		}
		// Command Sequence
		try {
			// Set Null to 0
			if (db.get(`guild_messages_${message.author.id}_count`) === null) {
			db.set(`guild_messages_${message.author.id}_count`, 0)
			}
			if (db.get(`guild_messages_${message.author.id}_count_permanent`) === null) {
			db.set(`guild_messages_${message.author.id}_count_permanent`, 0)
			}
			if (db.get(`guild_leveling_${message.author.id}`) === null) {
		db.set(`guild_leveling_${message.author.id}_count`, 0)
			}
			if (db.get(`guild_rebirths_${message.author.id}`)=== null) {
			db.set(`guild_rebirths_${message.author.id}`, 0)
			}
			if (db.get(`guild_prestiges_${message.author.id}`) === null) {
			db.set(`guild_prestiges_${message.author.id}`, 0)
			}
			if (db.get(`guild_rebirths_${message.author.id}_permanent`) === null) {
		db.set(`guild_rebirths_${message.author.id}_permanent`, 0)
			}
			if (db.get(`guild_prestiges_${message.author.id}_permanent`) === null) {
				db.set(`guild_prestiges_${message.author.id}_permanent`, 0)
			}
			if (!args[0]) {
				const selfStatsEmbed = new Discord.MessageEmbed()
				.setTitle(`Stats for \`${message.author.username}\``)
				.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(`Message Wallet: \`${db.get(`guild_messages_${message.author.id}_count`)}\`\nPermanent Messages Sent: \`${db.get(`guild_messages_${message.author.id}_count_permanent`)}\`\nRebirths: \`${db.get(`guild_rebirths_${message.author.id}_permanent`)}\`\nPrestiges: \`${db.get(`guild_prestiges_${message.author.id}_permanent`)}\`\nLevel: \`${db.get(`guild_leveling_${message.author.id}`)}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(selfStatsEmbed);
			} else {
				var target = client.users.cache.get(getIDFromMention(args[0]));
				var targetID = getIDFromMention(args[0]);
				if (db.get(`guild_rebirths_${targetID}_permanent`) === null) {
				db.set(`guild_rebirths_${targetID}_permanent`, 0)
				} 
				if (db.get(`guild_prestiges_${targetID}_permanent`) === null) {
				db.set(`guild_prestiges_${targetID}_permanent`, 0)
				}
				if (db.get(`guild_messages_${targetID}_count_permanent`)=== null) {
					db.set(`guild_messages_${targetID}_count_permanent`, 0)
				}
				if (db.get(`guild_leveling_${targetID}`) === null) {
					db.set(`guild_leveling_${targetID}`, 0)
				}
				const userStatsEmbed = new Discord.MessageEmbed()
				.setTitle(`Stats for \`${target.username}\``)
				.setAuthor(target.username, target.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
				.setDescription(`Message Wallet: \`${db.get(`guild_messages_${targetID}_count`)}\`\nPermanent Messages Sent: \`${db.get(`guild_messages_${targetID}_count_permanent`)}\`\nRebirths: \`${db.get(`guild_rebirths_${targetID}_permanent`)}\`\nPrestiges: \`${db.get(`guild_prestiges_${targetID}_permanent`)}\`\nLevel: \`${db.get(`guild_leveling_${targetID}`)}\``)
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				message.channel.send(userStatsEmbed);
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}