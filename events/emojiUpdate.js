module.exports = async (client, oldEmoji, newEmoji) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = oldEmoji.guild;
  try {
    if (!db.get(`guild_${guild.id}_logging_em-edit_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
      return;
    } else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_em-edit_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_em-edit_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_em-edit_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_em-edit_channel`);
			}
			if (oldEmoji === newEmoji) return;
      const emojiUpdateEmbed = new Discord.MessageEmbed()
			.setTitle('Emoji Updated')
      .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
      .setColor(config.blue)
      .setFooter(config.name, config.icon)
      .setTimestamp();
      if (oldEmoji.name !== newEmoji.name) {
        emojiUpdateEmbed.addField(`Old Name: ${oldEmoji.name}\nNew Name: ${newEmoji.name}`, `\u200B`);
      }
      client.channels.cache.get(setChannel).send(emojiUpdateEmbed);
    }
  } catch (error) {
    console.error(error);
  }
};
