module.exports = async (client, guild, user) => {
  const Discord = require('discord.js');
	const config = require('./evt_config.json');
	const db = require('quick.db');
	// Useful Locals
	var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
	var detail = db.get(`guild_${guild.id}_logging_detailtype`);
  try {
		if (!db.get(`guild_${guild.id}_logging_sr-badd_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
			return;
		} else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_sr-badd_enabled`) === true) {
      var setChannel = db.get(`guild_${guild.id}_logging_sr-badd_channel`);
    } else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
      setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
    } else if (db.get(`guild_${guild.id}_logging_sr-badd_enabled`) === true) {
      setChannel = db.get(`guild_${guild.id}_logging_sr-badd_channel`);
      }
      if (msgtyp === 'normal') {
        if (detail === '1') {
          client.channels.cache.get(setChannel).send(`**User Banned**\nUser: ${user.tag}\nUser ID: ${user.id}\n\nThere are now **${guild.memberCount}** members left.`);
        } else if (detail === '2') {
          client.channels.cache.get(setChannel).send(`**User Banned**\nUser: ${user.tag}\nUser ID: ${user.id}\nLast Message: "${user.lastMessage.content}"\nAvatar URL: ${user.avatarURL}\n\nThere are now **${guild.memberCount}** members left.`);
        } else if (detail === '3') {
          client.channels.cache.get(setChannel).send(`**User Banned**\nUser: ${user.tag}\nUser ID: ${user.id}\nLast Message: "${user.lastMessage.content}"\nAvatar URL: ${user.avatarURL}\nStatus: ${user.presence.status.toUpperCase()}\n\nThere are now **${guild.memberCount}** members left.`);
        } else if (detail === '4') {
          client.channels.cache.get(setChannel).send(`**User Banned**\nUser: ${user.tag}\nUser ID: ${user.id}\nLast Message: "${user.lastMessage.content}"\nLast Message ID: ${user.lastMessageID}\nLast Channel In: <#${user.lastMessageChannelID}>\nAvatar URL: ${user.avatarURL}\nStatus: ${user.presence.status.toUpperCase()}\n\nThere are now **${guild.memberCount}** members left.`);
        }
      } else if (msgtyp === 'embed') {
        if (detail === '1') {
          const detail1Embed = new Discord.MessageEmbed()
          .setTitle(`User Banned`)
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`There are now **${guild.memberCount}** members left.`)
          .addFields(
            { name: `User`, value: user.tag },
            { name: `User ID`, value: user.id },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail1Embed);
        } else if (detail === '2') {
          const detail2Embed = new Discord.MessageEmbed()
          .setTitle(`User Banned`)
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`There are now **${guild.memberCount}** members left.`)
          .addFields(
            { name: `User`, value: user.tag },
            { name: `User ID`, value: user.id },
            { name: `Last Message`, value: `\"${user.lastMessage.content}\"` },
            { name: `Avatar URL`, value: user.avatarURL },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail2Embed);
        } else if (detail === '3') {
          const detail3Embed = new Discord.MessageEmbed()
          .setTitle(`User Banned`)
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`There are now **${guild.memberCount}** members left.`)
          .addFields(
            { name: `User`, value: user.tag },
            { name: `User ID`, value: user.id },
            { name: `Last Message`, value: `\"${user.lastMessage.content}\"` },
            { name: `Avatar URL`, value: user.avatarURL },
            { name: `Status`, value: user.presence.status.toUpperCase() },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail3Embed);
        } else if (detail === '4') {
          const detail4Embed = new Discord.MessageEmbed()
          .setTitle(`User Banned`)
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`There are now **${guild.memberCount}** members left.`)
          .addFields(
            { name: `User`, value: user.tag },
            { name: `User ID`, value: user.id },
            { name: `Last Message`, value: `\"${user.lastMessage.content}\"` },
            { name: `Last Message ID`, value: user.lastMessageID },
            { name: `Last Channel In`, value: `<#${user.lastMessageChannelID}>` },
            { name: `Avatar URL`, value: user.avatarURL },
            { name: `Status`, value: user.presence.status.toUpperCase() },
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
