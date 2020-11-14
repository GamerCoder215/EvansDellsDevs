module.exports = async (client, oldMessage, newMessage) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');

	const guild = oldMessage.guild
  if (!db.get(`guild_${guild.id}_logging_msg-edit_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
    return;
  } else {
		if (oldMessage === newMessage) return;
		if (oldMessage.author.bot) return;
    if (db.get(`guild_${guild.id}_logging_all_enabled`) && db.get(`guild_${guild.id}_logging_msg-edit_enabled`)) {
      var setChannel = db.get(`guild_${guild.id}_logging_msg-edit_channel`);
    } else if (db.get(`guild_${guild.id}_logging_all_enabled`)) {
      setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
    } else if (db.get(`guild_${guild.id}_logging_msg-edit_enabled`)) {
      setChannel = db.get(`guild_${guild.id}_logging_msg-edit_channel`);
    }
	const messageUpdateEmbed = new Discord.MessageEmbed()
	.setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
	.setColor(config.blue)
	.setFooter(config.name, config.icon)
	.setTimestamp();
	if (oldMessage.content !== newMessage.content) {
		messageUpdateEmbed.addField(`Old Message: ${oldMessage.content}\nNew Message: **${newMessage.content}**`, `\u200B`);
	}
	client.channels.cache.get(setChannel).send(messageUpdateEmbed);
	}
}