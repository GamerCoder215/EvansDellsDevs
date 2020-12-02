module.exports = async (client, oldGuild, newGuild) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = oldGuild;
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
			if (oldGuild === newGuild) return;
      const guildUpdateEmbed = new Discord.MessageEmbed()
			.setTitle(`Guild ${guild.name} Updated`)
      .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
      .setColor(config.blue)
      .setFooter(config.name, config.icon)
      .setTimestamp();
      if (oldGuild.afkChannel !== newGuild.afkChannel) {
        guildUpdateEmbed.addField(`Old AFK Channel: ${oldGuild.afkChannel.name}\nNew AFK Channel: ${newGuild.afkChannel.name}`, `\u200B`);
      }
      if (oldGuild.large !== newGuild.large) {
        if (newGuild.large === true) {
          guildUpdateEmbed.addField(`This guild is now "large"`, `\u200B`);
        } else if (newGuild.large === false) {
          guildUpdateEmbed.addField(`This guild is no longer "large"`, `\u200B`);
        }
      }
      if (oldGuild.ownerID !== newGuild.ownerID) {
        guildUpdateEmbed.addField(`Old Owner: ${oldGuild.owner.user.tag}\nNew Owner: ${newGuild.owner.user.tag}`, `\u200B`);
      }
      if (oldGuild.name !== newGuild.name) {
        guildUpdateEmbed.addField(`Old Name: ${oldGuild.name}\nNew Name: ${newGuild.name}`, `\u200B`);
      }
      if (oldGuild.premiumSubscriptionCount !== newGuild.premiumSubscriptionCount) {
        guildUpdateEmbed.addField(`Old Boost Count: \`${oldGuild.premiumSubscriptionCount}\`\nNew Boost Count: \`${newGuild.premiumSubscriptionCount}\``, `\u200B`);
      }
      if (oldGuild.region !== newGuild.region) {
        guildUpdateEmbed.addField(`Old Region: ${oldGuild.region}\nNew Region: ${newGuild.region}`, `\u200B`);
      }
      if (oldGuild.verified !== newGuild.verified) {
        if (newGuild.verified === true) {
          guildUpdateEmbed.addField(`This guild is now Verified!`);
        } else if (newGuild.verified === false) {
          guildUpdateEmbed.addField(`This guild isn't Verified anymore.`);
        }
      }
      if (oldGuild.partnered !== newGuild.partnered) {
        if (newGuild.partnered === true) {
          guildUpdateEmbed.addField(`This guild is now Partnered!`);
        } else if (newGuild.partnered === false) {
          guildUpdateEmbed.addField(`This guild isn't Partnered anymore.`);
        }
      }
			if (guildUpdateEmbed.fields.length < 1) return;
      client.channels.cache.get(setChannel).send(guildUpdateEmbed);
    }
  } catch (error) {
    console.error(error);
  }
};
