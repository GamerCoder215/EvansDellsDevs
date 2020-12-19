module.exports = async (client, oldChannel, newChannel) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');

	const guild = oldChannel.guild
  if (!db.get(`guild_${guild.id}_logging_ch-edit_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
    return;
  } else {
    if (db.get(`guild_${guild.id}_logging_all_enabled`) && db.get(`guild_${guild.id}_logging_ch-edit_enabled`)) {
      var setChannel = db.get(`guild_${guild.id}_logging_ch-edit_channel`);
    } else if (db.get(`guild_${guild.id}_logging_all_enabled`)) {
      setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
    } else if (db.get(`guild_${guild.id}_logging_ch-edit_enabled`)) {
      setChannel = db.get(`guild_${guild.id}_logging_ch-edit_channel`);
    }
			if (oldChannel === newChannel) return;
      const updateEmbed = new Discord.MessageEmbed()
      .setTitle('Channel Updated')
      .setColor(config.blue)
      .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
			.setFooter(config.name, config.icon)
			.setTimestamp();
        if (oldChannel.members.size !== newChannel.members.size) {
          updateEmbed.addField(`Old Member Count: ${oldChannel.members.size}\nNew Member Count: **${oldChannel.members.size}**`, `\u200B`);
        }
        if (oldChannel.name !== newChannel.name) {
          updateEmbed.addField(`Old Name: ${oldChannel.name}\nNew Name: **${newChannel.name}**`, `
					\u200B`);
        }
				
        if (oldChannel.position !== newChannel.position) {
          updateEmbed.addField(`Old Position: ${oldChannel.position}\nNew Position: ${newChannel.position}`);
        }
				if (updateEmbed.fields.length < 1) return;
      client.channels.cache.get(setChannel).send(updateEmbed);
  }
};
