module.exports = async (client, message) => {
	const Discord = require('discord.js');
	const config = require('./evt_config.json');
	const db = require('quick.db');
	// Useful Locals
	const guild = message.guild;
	var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
	try {
		if (!db.get(`guild_${guild.id}_logging_msg-delete_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
			if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_msg-delete_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_msg-delete_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_msg-delete_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_msg-delete_channel`);
			}
			if (msgtyp === 'normal') {
				if (detail === '1') {
				client.channels.cache.get(setChannel).send(`**Message Deleted**\nContent: ${message.content}\n`);
				} else if (detail === '2') {
				client.channels.cache.get(setChannel).send(`**Message Deleted**\nContent: ${message.content}\nPinned: ${message.pinned}\nID: ${message.id}`);
				} else if (detail === '3') {
				client.channels.cache.get(setChannel).send(`**Message Deleted**\nContent: ${message.content}\nType: ${message.pinned}\nID: ${message.id}\nParent Channel: ${message.channel.name}`);
				} else if (detail === '4') {
				client.channels.cache.get(setChannel).send(`**Message Deleted**\nContent: ${message.content}\nPinned: ${message.pinned}\nID: ${message.id}\nDeleted At (Timestamp): ${Date.now()}\nParent Channel: ${message.channel.name}\nParent Channel ID: ${message.channel.id}\nReactions: ${message.reactions.cache.size}`);
				}
			} else if (msgtyp === 'embed') {
				if (detail === '1') {
					const detail1Embed = new Discord.MessageEmbed()
					.setTitle(`Message Deleted`)
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Message Content', value: message.content },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					if (detail1Embed.fields.length < 1) return;
					client.channels.cache.get(setChannel).send(detail1Embed);
				} else if (detail === '2') {
					const detail2Embed = new Discord.MessageEmbed()
					.setTitle('Message Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Message Content', value: message.content },
						{ name: 'Pinned', value: message.pinned },
						{ name: 'Message ID', value: message.id },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					if (detail2Embed.fields.length < 1) return;
					client.channels.cache.get(setChannel).send(detail2Embed);
				} else if (detail === '3') {
					const detail3Embed = new Discord.MessageEmbed()
					.setTitle('Message Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Message Content', value: message.content },
						{ name: 'Pinned', value: message.pinned },
						{ name: 'Message Author', value: message.author.username },
						{ name: 'Message ID', value: message.id },
						{ name: 'Parent Channel', value: message.channel.name },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					if (detail3Embed.fields.length < 1) return;
					client.channels.cache.get(setChannel).send(detail3Embed);
				} else if (detail === '4') {
					const detail4Embed = new Discord.MessageEmbed()
					.setTitle('Message Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Message Content', value: message.content },
						{ name: 'Pinned', value: message.pinned },
						{ name: 'Message Author', value: message.author.username },
						{ name: 'Message ID', value: message.id },
						{ name: 'Deleted At (Timestamp)', value: Date.now() },
						{ name: 'Parent Channel', value: message.channel.name },
						{ name: 'Parent Channel ID', value: message.channel.id },
						{ name: 'Reactions', value: message.reactions.cache.size }
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					if (detail1Embed.fields.length < 1) return;
					client.channels.cache.get(setChannel).send(detail4Embed);
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};
