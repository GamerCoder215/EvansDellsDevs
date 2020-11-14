module.exports = async (client, oldMember, newMember) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = oldMember.guild;
  try {
    if (!db.get(`guild_${guild.id}_logging_sr-memedit_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
      return;
    } else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_sr-memedit_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_sr-memedit_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_sr-memedit_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_sr-memedit_channel`);
			}
      const memberUpdateEmbed = new Discord.MessageEmbed()
      .setTitle(`User \`${newMember.nickname}\`#${newMember.user.discriminator}`)
      .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
      .setColor(config.blue)
      .setFooter(config.name, config.icon)
      .setTimestamp();
      if (oldMember.user.username !== newMember.user.username) {
        memberUpdateEmbed.addField(`Old Username: ${oldMember.user.username}\nNew Username: ${newMember.username}`, `\u200B`);
      }
      if (oldMember.user.discriminator !== newMember.user.discriminator) {
        memberUpdateEmbed.addField(`Old Discriminator: ${oldMember.user.discriminator}\nNew Discriminator: ${newMember.user.discriminator}`, `\u200B`);
      }
      if (oldMember.user.avatarURL !== newMember.user.avatarURL) {
        memberUpdateEmbed.addField(`Old Avatar: ${oldMember.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}\nNew Avatar: ${newMember.user.displayAvatarURL({ dyanmic: true, format: 'png', size: 1024 })}`);
      }
      if (oldMember.nickname !== newMember.nickname) {
        memberUpdateEmbed.addField(`Old Nickname: ${oldMember.displayName}\nNew Nickname: ${newMember.nickname}`, `\u200B`);
      }
      if (oldMember.kickable !== newMember.kickable) {
        if (newMember.kickable === true) {
          memberUpdateEmbed.addField(`User is now __kickable__`, `\u200B`);
        } else if (newMember.kickable === false) {
          memberUpdateEmbed.addField(`Users is now __not kickable__`, `\u200B`);
        }
      }
      if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        if (oldMember.roles.cache.size > newMember.roles.cache.size) {
          memberUpdateEmbed.addField(`Removed \`${oldMember.roles.cache.size - newMember.roles.cache.size}\` roles`);
        } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
          memberUpdateEmbed.addField(`Added \`${newMember.roles.cache.size - oldMember.roles.cache.size}\` roles`);
        }
      }
      client.channels.cache.get(setChannel).send(memberUpdateEmbed);
    }
  } catch (error) {
    console.error(error);
  }
};
