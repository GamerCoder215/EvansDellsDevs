module.exports = async (client, invite) => {
  const Discord = require('discord.js');
  const config = require('./evt_config.json');
  const db = require('quick.db');
  // Useful Locals
  const guild = invite.guild;
  var msgtyp = db.get(`guild_${guild.id}_logging_msgtype`);
  var detail = db.get(`guild_${guild.id}_logging_detailtype`);
  try {
    if (!db.get(`guild_${guild.id}_logging_inv-create_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
      return;
    } else {
      if (db.get(`guild_${guild.id}_logging_all_enabled`) === true && db.get(`guild_${guild.id}_logging_inv-create_enabled`) === true) {
				var setChannel = db.get(`guild_${guild.id}_logging_inv-create_channel`);
			} else if (db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_all_channel`);
			} else if (db.get(`guild_${guild.id}_logging_inv-create_enabled`) === true) {
				setChannel = db.get(`guild_${guild.id}_logging_inv-create_channel`);
			}
      if (msgtyp === 'normal') {
        if (detail === '1') {
          client.channels.cache.get(setChannel).send(`**Invite Created**\nCode: \`${invite.code}\`Temporary: ${invite.temporary}`);
        } else if (detail === '2') {
          client.channels.cache.get(setChannel).send(`**Invite Created**\nCode: \`${invite.code}\`Temporary: ${invite.temporary}\nURL: ${invite.url}\nAuthor: ${invite.inviter.username}`);
        } else if (detail === '3') {
          client.channels.cache.get(setChannel).send(`**Invite Created**\nCode: \`${invite.code}\`Temporary: ${invite.temporary}\nURL: ${invite.url}\nAuthor: ${invite.inviter.username}\nCreated At: ${invite.createdAt}\nExpires At: ${invite.expiresAt}`);
        } else if (detail === '4') {
          client.channels.cache.get(setChannel).send(`**Invite Created**\nCode: \`${invite.code}\`Temporary: ${invite.temporary}\nURL: ${invite.url}\nAuthor: ${invite.inviter.username}\nAuthor ID: ${invite.inviter.id}\nCreated At: ${invite.createdAt}\nCreated At (Timestamp): ${invite.createdTimestamp}\nExpires At: ${invite.expiresAt}\nExpires At (Timestamp): ${invite.expiresTimestamp}`);
        }
      } else if (msgtyp === 'embed') {
        if (detail === '1') {
          const detail1Embed = new Discord.MessageEmbed()
          .setTitle('Invite Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Code', value: `\`${invite.code}\`` },
            { name: 'Temporary', value: invite.temporary },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail1Embed);
        } else if (detail === '2') {
          const detail2Embed = new Discord.MessageEmbed()
          .setTitle('Invite Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Code', value: `\`${invite.code}\`` },
            { name: 'Temporary', value: invite.temporary },
            { name: 'URL', value: invite.URL },
            { name: 'Author', value: invite.inviter.username },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail2Embed);
        } else if (detail === '3') {
          const detail3Embed = new Discord.MessageEmbed()
          .setTitle('Invite Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Code', value: `\`${invite.code}\`` },
            { name: 'Temporary', value: invite.temporary },
            { name: 'URL', value: invite.URL },
            { name: 'Author', value: invite.inviter.username },
            { name: 'Created At', value: invite.createdAt },
            { name: 'Expires At', value: invite.expiresAt },
          )
          .setColor(config.blue)
          .setFooter(config.name, config.icon)
          .setTimestamp();
          client.channels.cache.get(setChannel).send(detail3Embed);
        } else if (detail === '4') {
          const detail4Embed = new Discord.MessageEmbed()
          .setTitle('Invite Created')
          .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
          .addFields(
            { name: 'Code', value: `\`${invite.code}\`` },
            { name: 'Temporary', value: invite.temporary },
            { name: 'URL', value: invite.URL },
            { name: 'Author', value: invite.inviter.username },
            { name: 'Author ID', value: invite.inviter.id },
            { name: 'Created At', value: invite.createdAt },
            { name: 'Created At (Timestamp)', value: invite.createdTimestamp },
            { name: 'Expires At', value: invite.expiresAt },
            { name: 'Expires At (Timestamp)', value: invite.expiresTimestamp },
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
