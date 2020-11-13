module.exports = async (client, guild, oldChannel, newChannel) => {
  const Discord = require('discord.js');
  const config = require('../evt_config.json');
  const db = require('quick.db');
  if (!db.get(`guild_${guild.id}_logging_ch-edit_enabled`) && !db.get(`guild_${guild.id}_logging_all_enabled`) === true) {
    return;
  } else {
    if (db.get(`guild_${guild.id}_logging_all`) && db.get(`guild_${guild.id}_logging_ch-edit`)) {
      var setChannel = db.get(`guild_${guild.id}_logging_ch-edit`);
    } else if (db.get(`guild_${guild.id}_logging_all`)) {
      setChannel = db.get(`guild_${guild.id}_logging_all`);
    } else if (db.get(`guild_${guild.id}_logging_ch-edit`)) {
      setChannel = db.get(`guild_${guild.id}_logging_ch-edit`);
    }
    function checkUpdate() {
      const updateEmbed = new Discord.MessageEmbed()
      .setTitle('Channel Updated')
      .setColor(config.blue)
      .setAuthor(guild.name, guild.iconURL({ dynamic: true, format: 'png', size: 1024 }));
        if (oldChannel.members.size !== newChannel.members.size) {
          updateEmbed.addField(`Old Member Count: ${oldChannel.members.size}\nNew Member Count: **${oldChannel.members.size}**`);
        }
        if (oldChannel.name !== newChannel.name) {
          updateEmbed.addField(`Old Name: ${oldChannel.name}\nNew Name: **${newChannel.name}**`);
        }
        if (oldChannel.parent.id !== newChannel.parent.id) {
          if (oldChannel.type === 'category') {
            var parent = 'Server';
          } else {
            parent = newChannel.parent.name;
          }
          updateEmbed.addField(`Old Category: ${parent}\nNew Category: ${parent}`);
        }
        if (oldChannel.position !== newChannel.position) {
          updateEmbed.addField(`Old Position: ${oldChannel.position}\nNew Position: ${newChannel.position}`);
        }
        client.channels.cache.get(setChannel).send(updateEmbed);
    }
    checkUpdate();
  }
};
