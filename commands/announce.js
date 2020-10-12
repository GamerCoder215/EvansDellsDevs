module.exports = {
  name: 'announce',
  description: 'Make an announcement, with an option of role mention.',
  aliases: ['ann'],
	guildOnly: true,
	cooldown: 30,
  async run(client, message, args) {
    const Discord = require('discord.js')
    const managerRole = require('./botManagerRole.js');
    // Tables
    var sucessMessages = [
    `Congrats ${message.author.username}, your action was sucessful.`,
    `Mission Accomplished, ${message.author.username}.`,
    `Your action was sucessful, ${message.author.username}.`,
    `${message.author.username}\'s action was sucessful.`,
    `All systems go, ${message.author.username}!`
    ]
      // Embeds (General)
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
    const invalidArguments = new Discord.MessageEmbed()
      .setTitle('Error 02')
      .setDescription('You have provided invalid arguments!')
      .setFooter(`${message.author.username}`, 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
      .setColor('#ff0000')
      .setTimestamp();
      // Functions
        function getChannelFromMention(mention) {
	      if (!mention) return;

        if (mention.startsWith('<#') && mention.endsWith('>')) {
          var mentionID = mention.replace(/[<#>]/g,'');
          return (mentionID);
        }
      }
				function mentionChoiceFunction(choice) {
					if (!choice) return;

					if (choice === 'everyone') {
						return ('@everyone');
					} else if (choice === 'here') {
						return ('@here');
					} else if (choice === 'none') {
						return ('');
					} else if (choice.startsWith('<@&') && choice.endsWith('>')) {
						var roleMentionID = choice;
						return (roleMentionID);
					} else {
						return ('');
					}
				}
      // Security Check
      if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.get(managerRole.managerRole)) {
      return message.channel.send(invalidPermissions);
    } else {
      var announceChannel = getChannelFromMention(args[0]);
			var mentionChoice = mentionChoiceFunction(args[1])
      var announceMessage = args.slice(2).join(' ');
      // Argument Check
      if (!announceChannel) {
        return message.channel.send(invalidArguments);
      } else if (!announceMessage) {
        return message.channel.send(invalidArguments); 
      }
			// Announce Sequence
      const announceEmbed = new Discord.MessageEmbed()
      .setTitle(`📣 Announcement from \`${message.author.username}\``)
      .setDescription(announceMessage)
      .setColor('#4DFFFF')
      .setFooter(`${message.author.username}`, `https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png`)
      .setTimestamp();
			client.channels.cache.get(announceChannel).send(mentionChoice, announceEmbed);
      message.channel.send(actionSuccessful);
		}
  }
}