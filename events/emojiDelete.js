module.exports = async (client, emoji) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = emoji.guild;
  var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
  try {
		if (!db.get(`guild_${guild.id}_logging_em-delete_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_em-delete_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_em-delete_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_em-delete_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_em-delete_channel`);
			}
      if (msgtyp === 'normal') {
        if (detail === '1') {
          client.channels.cache.get(setChannel).send(`**Emoji Deleted**\nEmoji Name: ${emoji.name}`);
        } else if (detail === '2') {
          client.channels.cache.get(setChannel).send(`**Emoji Deleted**\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nAuthor: ${emoji.author.username}`);
        } else if (detail === '3') {
          client.channels.cache.get(setChannel).send(`**Emoji Deleted**\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nAuthor: ${emoji.author.username}\nAuthor ID: ${emoji.author.id}\nAnimated: ${emoji.animated}`);
        } else if (detail === '4') {
          client.channels.cache.get(setChannel).send(`**Emoji Deleted**\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nEmoji Identifier: ${emoji.identifier}Author: ${emoji.author.username}\nAuthor ID: ${emoji.author.id}\nAnimated: ${emoji.animated}\nDeleted At (Timestamp): ${Date.now()}`);
        }
      } else if (msgtyp === 'embed') {
        if (detail === '1') {
          const detail1Embed = new Discord.MessageEmbed()
          .setTitle('Emoji Deleted')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji Name', value: emoji.name },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail1Embed);
        } else if (detail === '2') {
          const detail2Embed = new Discord.MessageEmbed()
          .setTitle('Emoji Deleted')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji Name', value: emoji.name },
            { name: 'Emoji ID', value: emoji.id },
            { name: 'Author', value: emoji.author.username },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail2Embed);
        } else if (detail === '3') {
          const detail3Embed = new Discord.MessageEmbed()
          .setTitle('Emoji Deleted')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji Name', value: emoji.name },
            { name: 'Emoji ID', value: emoji.id },
            { name: 'Author', value: emoji.author.username },
            { name: 'Author ID', value: emoji.author.id },
            { name: 'Animated', value: emoji.animated },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail3Embed);
        } else if (detail === '4') {
          const detail4Embed = new Discord.MessageEmbed()
          .setTitle('Emoji Deleted')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji Name', value: emoji.name },
            { name: 'Emoji ID', value: emoji.id },
            { name: 'Emoji Identifier', value: emoji.identifier },
            { name: 'Author', value: emoji.author.username },
            { name: 'Author ID', value: emoji.author.id },
            { name: 'Animated', value: emoji.animated },
            { name: 'Deleted At (Timestamp)', value: Date.now() },
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
