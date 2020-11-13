module.exports = async (client, channel) => {
	const Discord = require('discord.js');
	const config = require('./evt_config.json');
	const db = require('quick.db');
	// Useful Locals
	const guild = channel.guild;
	var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
	if (channel.type === 'category') {
		var parent = 'Server';
	} else {
		var parent = channel.parent.name;
	}
	try {
		console.log(db.get(`guild_${guild.id}_logging_ch-delete_enabled`))
		console.log(db.get(`guild_${guild.id}_logging_all_enabled`))
		if (!db.get(`guild_${guild.id}_logging_ch-delete_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
			if (db.get(`guild_${guild.id}_logging_all`) === true && db.get(`guild_${guild.id}_logging_ch-delete`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_ch-delete`);
			} else if (db.get(`guild_${guild.id}_logging_all`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all`);
			} else if (db.get(`guild_${guild.id}_logging_ch-delete`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_ch-delete`);
			}
			if (msgtyp === 'normal') {
				if (detail === 1) {
				client.channels.cache.get(setChannel).send(`**Channel Deleted**\nName: ${channel.name}\n`);
				} else if (detail === 2) {
				client.channels.cache.get(setChannel).send(`**Channel Deleted**\nName: ${channel.name}\nType: ${channel.type}\nID: ${channel.id}`);
				} else if (detail === 3) {
				client.channels.cache.get(setChannel).send(`**Channel Deleted**\nName: ${channel.name}\nType: ${channel.type}\nID: ${channel.id}\nParent Category: ${parent}`);
				} else if (detail === 4) {
				client.channels.cache.get(setChannel).send(`**Channel Deleted**\nName: ${channel.name}\nType: ${channel.type}\nID: ${channel.id}\nDeleted At (Timestamp): ${Date.now()}\nParent Category: ${parent}\nPosition: ${channel.position}\nRaw Position: ${channel.rawPosition}\n`);
				}
			} else if (msgtyp === 'embed') {
				if (detail === 1) {
					const detail1Embed = new Discord.MessageEmbed()
					.setTitle(`Channel Deleted`)
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Channel Name', value: channel.name },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					client.channels.cache.get(setChannel).send(detail1Embed);
				} else if (detail === 2) {
					const detail2Embed = new Discord.MessageEmbed()
					.setTitle('Channel Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Channel Name', value: channel.name },
						{ name: 'Channel Type', value: channel.type },
						{ name: 'Channel ID', value: channel.id },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					client.channels.cache.get(setChannel).send(detail2Embed);
				} else if (detail === 3) {
					const detail3Embed = new Discord.MessageEmbed()
					.setTitle('Channel Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Channel Name', value: channel.name },
						{ name: 'Channel Type', value: channel.type },
						{ name: 'Channel ID', value: channel.id },
						{ name: 'Parent Category', value: parent },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					client.channels.cache.get(setChannel).send(detail3Embed);
				} else if (detail === 4) {
					const detail4Embed = new Discord.MessageEmbed()
					.setTitle('Channel Deleted')
					.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
					.addFields(
						{ name: 'Channel Name', value: channel.name },
						{ name: 'Channel Type', value: channel.type },
						{ name: 'Channel ID', value: channel.id },
						{ name: 'Deleted At (Timestamp)', value: Date.now() },
						{ name: 'Parent Category', value: parent },
						{ name: 'Position', value: channel.position },
						{ name: 'Raw Position', value: channel.rawPosition },
					)
					.setColor(config.blue)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					client.channels.cache.get(setChannel).send(detail4Embed);
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};
