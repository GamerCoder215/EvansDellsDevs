module.exports = {
  name: 'botmanager',
  description: 'Set a role that allows people to use all commands.',
  aliases: ['botm', 'bmanager', 'bm'],
	guildOnly: true,
  async run(client, message, args) {
    // Discord
    const Discord = require('discord.js');
    // Tables
    var sucessMessages = [
    `Congrats ${message.author.username}, your action was sucessful.`,
    `Mission Accomplished, ${message.author.username}.`,
    `Your action was sucessful, ${message.author.username}.`,
    `${message.author.username}\'s action was sucessful.`,
    `All systems go, ${message.author.username}!`
    ]
    // Embeds
    const actionSuccessful = new Discord.MessageEmbed()
    .setTitle('Action Sucessful')
    .setDescription(sucessMessages[Math.floor(Math.random() * 5)])
    .setFooter('', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#4DFFFF')
    .setTimestamp();

    const invalidPermissions = new Discord.MessageEmbed()
      .setTitle('Error 03')
      .setDescription('You do not have permission to use this command.')
      .setFooter(`${message.author.username}`, 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
      .setColor('#ff0000')
      .setTimestamp();
    // Function
      function getRoleFromMention(mention) {
	    if (!mention) return;

        if (mention.startsWith('<@&') && mention.endsWith('>')) {
          var roleID = mention.replace(/[<@&>]/g,'');
          return (roleID);
        }
      }
    // Command Sequence
    // Security Check
    if (!message.member.hasPermission('MANAGE_SERVER')) {
      return message.channel.send(invalidPermissions);
    } else {
      let managerRole = getRoleFromMention(args[0]);
      module.exports = managerRole;
      return message.channel.send(actionSuccessful);
    }

  }
}