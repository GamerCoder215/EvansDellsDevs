module.exports = async (client, messages) => {
	const Discord = require('discord.js');
	const config = require('./evt_config.json');
	const db = require('quick.db');
	// Useful Locals
	const guild = messages.first().guild
	var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
	try {
		if (!db.get(`guild_${guild.id}_logging_msg-delbulk_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
			if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_msg-delbulk_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_msg-delbulk_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_msg-delbulk_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_msg-delbulk_channel`);
			}
			if (msgtyp === 'normal') {
				client.channels.cache.get(setChannel).send(`Messages Deleted: \`${messages.cache.size}\``)
			} else if (msgtyp === 'embed') {
				const bulkDeleteEmbed = new Discord.MessageEmbed()
				.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
				.setColor(config.blue)
				.addField(`Messages Deleted: \`${messages.size}\``, '\u200b')
				.setFooter(config.name, config.icon)
				.setTimestamp();
				client.channels.cache.get(setChannel).send(bulkDeleteEmbed);
			}
		}
	} catch (error) {
		console.error(error);
	}
};
