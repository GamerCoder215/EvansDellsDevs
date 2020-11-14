module.exports = async (client, emoji) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = emoji.guild;
  var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
  try {
		if (!db.get(`guild_${guild.id}_logging_em-create_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_em-create_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_em-create_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_em-create_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_em-create_channel`);
			}
      if (msgtyp === 'normal') {
        if (detail === '1') {
          client.channels.cache.get(setChannel).send(`**New Emoji Created**\nEmoji: <:${emoji.name}:${emoji.id}>\nEmoji Name: ${emoji.name}`);
        } else if (detail === '2') {
          client.channels.cache.get(setChannel).send(`**New Emoji Created**\nEmoji: <:${emoji.name}:${emoji.id}>\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nAuthor: ${emoji.author.username}`);
        } else if (detail === '3') {
          client.channels.cache.get(setChannel).send(`**New Emoji Created**\nEmoji: <:${emoji.name}:${emoji.id}>\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nAuthor: ${emoji.author.username}\nAuthor ID: ${emoji.author.id}\nAnimated: ${emoji.animated}\nCreated At: ${emoji.createdAt}`);
        } else if (detail === '4') {
          client.channels.cache.get(setChannel).send(`**New Emoji Created**\nEmoji: <:${emoji.name}:${emoji.id}>\nEmoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}\nEmoji Identifier: ${emoji.identifier}Author: ${emoji.author.username}\nAuthor ID: ${emoji.author.id}\nAnimated: ${emoji.animated}\nCreated At: ${emoji.createdAt}\nCreated At (Timestamp): ${emoji.createdTimestamp}`);
        }
      } else if (msgtyp === 'embed') {
        if (detail === '1') {
          const detail1Embed = new Discord.MessageEmbed()
          .setTitle('New Emoji Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}>` },
            { name: 'Emoji Name', value: emoji.name },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail1Embed);
        } else if (detail === '2') {
          const detail2Embed = new Discord.MessageEmbed()
          .setTitle('New Emoji Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}>` },
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
          .setTitle('New Emoji Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}>` },
            { name: 'Emoji Name', value: emoji.name },
            { name: 'Emoji ID', value: emoji.id },
            { name: 'Author', value: emoji.author.username },
            { name: 'Author ID', value: emoji.author.id },
            { name: 'Animated', value: emoji.animated },
            { name: 'Created At', value: emoji.createdAt },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail3Embed);
        } else if (detail === '4') {
          const detail4Embed = new Discord.MessageEmbed()
          .setTitle('New Emoji Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Emoji', value: `<:${emoji.name}:${emoji.id}>` },
            { name: 'Emoji Name', value: emoji.name },
            { name: 'Emoji ID', value: emoji.id },
            { name: 'Emoji Identifier', value: emoji.identifier },
            { name: 'Author', value: emoji.author.username },
            { name: 'Author ID', value: emoji.author.id },
            { name: 'Animated', value: emoji.animated },
            { name: 'Created At', value: emoji.createdAt },
            { name: 'Created At (Timestamp)', value: emoji.createdTimestamp },
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
