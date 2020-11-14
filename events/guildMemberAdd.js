module.exports = async (client, member) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = member.guild;
  var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
  var detail = db.get(`guild_${guild.id}_logging_detailtype`);
  try {
    if (!db.get(`guild_${guild.id}_logging_sr-memadd_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
      return;
    } else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_sr-memadd_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_sr-memadd_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_sr-memadd_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_sr-memadd_channel`);
			}
      if (msgtyp === 'normal') {
        if (detail === '1') {
          client.channels.cache.get(setChannel).send(`**User Joined**\nUser: ${member.user.tag}\n\nMember #${guild.memberCount}`);
        } else if (detail === '2') {
          client.channels.cache.get(setChannel).send(`**User Joined**\nUser: ${member.user.tag}\nUser Mention: <@${member.user.id}>\nUser ID: ${member.user.id}\n\nMember #${guild.memberCount}`);
        } else if (detail === '3') {
          client.channels.cache.get(setChannel).send(`**User Joined**\nUser: ${member.user.tag}\nUser Mention: <@${member.user.id}>\nUser ID: ${member.user.id}\nJoined At: ${member.joinedAt}\n\nMember #${guild.memberCount}`);
        } else if (detail === '4') {
          client.channels.cache.get(setChannel).send(`**User Joined**\nUser: ${member.user.tag}\nUser Mention: <@${member.user.id}>\nUser ID: ${member.user.id}\nJoined At: ${member.joinedAt}\nAccount Age (Days): ${member.user.createdTimestamp / (1000 * 60 * 60 * 24)}\nStatus: ${member.presence.status.toUpperCase()}\n\nMember #${guild.memberCount}`);
        }
      } else if (msgtyp === 'embed') {
        if (detail === '1') {
          const detail1Embed = new Discord.MessageEmbed()
          .setTitle('User Joined')
          .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`Member #${guild.memberCount}`)
          .addFields(
            { name: 'User', value: member.user.tag },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail1Embed);
        } else if (detail === '2') {
          const detail2Embed = new Discord.MessageEmbed()
          .setTitle('User Joined')
          .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`Member #${guild.memberCount}`)
          .addFields(
            { name: 'User', value: member.user.tag },
            { name: 'User Mention', value: `<@${member.user.id}>` },
            { name: 'User ID', value: member.user.id },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail2Embed);
        } else if (detail === '3') {
          const detail3Embed = new Discord.MessageEmbed()
          .setTitle('User Joined')
          .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`Member #${guild.memberCount}`)
          .addFields(
            { name: 'User', value: member.user.tag },
            { name: 'User Mention', value: `<@${member.user.id}>` },
            { name: 'User ID', value: member.user.id },
            { name: 'Joined At', value: member.joinedAt },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail3Embed);
        } else if (detail === '4') {
          const detail4Embed = new Discord.MessageEmbed()
          .setTitle('User Joined')
          .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
          .setDescription(`Member #${guild.memberCount}`)
          .addFields(
            { name: 'User', value: member.user.tag },
            { name: 'User Mention', value: `<@${member.user.id}>` },
            { name: 'User ID', value: member.user.id },
            { name: 'Joined At', value: member.joinedAt },
            { name: 'Account Age (Days)', value: member.user.createdTimestamp / (1000 * 60 * 60 * 24) },
            { name: 'Status', value: member.presence.status.toUpperCase() },
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
