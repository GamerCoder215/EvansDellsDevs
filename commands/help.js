module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Help Message',
  async run(client, message, args) {
  // Constants
  const Discord = require('discord.js');
  const prefix = 'an!';
  const managerRole = require('./botManagerRole.js');
  // Embeds
    const invalidPermissions = new Discord.MessageEmbed()
    .setTitle('Error 03')
    .setDescription('You do not have permission to use this command.')
    .setFooter(`${message.author.username}`, 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#ff0000')
    .setTimestamp();

  const helpEmbed = new Discord.MessageEmbed()
    .setTitle(`Help for ${message.author.username}`)
    .setDescription('Type an!help <module> for help about that module!\n🔧 = Manage Server Permission Required ')
		.addFields(
		{ name: '📓 General', value: '\`ad!help general\`', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '🎉 Fun / Offtopic', value: '\`ad!help fun\` **or** \`ad!help offtopic\`', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '💻 Setup 🔧', value: '\`ad!help setup\`', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '🔨 Moderation 🔧', value: '\`ad!help moderation\`', inline: true },
	)
		.setDescription('\`\`\`css\n[] is optional, <> is required\`\`\`')
    .setFooter('AnnounceBot', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#4DFFFF')
    .setTimestamp();

  const helpEmbedGeneral = new Discord.MessageEmbed()
    .setTitle(`Help for ${message.author.username} | General`)
    .setDescription('an!help | Display a help message.\n\nan!links | Get some useful links.')
    .setFooter('AnnounceBot | General', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#4DFFFF')
    .setTimestamp();
	const helpEmbedFunOfftopic = new Discord.MessageEmbed()
	.setTitle(`Help for ${message.author.username} | Fun`)
	.setDescription('an!8ball | Do an 8 ball!\n\nan!bubblewrap | Pop some bubble wrap! (Chance for a code to win something)\n\nan!distract | Distract a channel while you get away!\n\nan!pokemon | Find out your identical pokemon counterpart!')
	.setColor('#4DFFFF')
	.setFooter('AnnounceBot | Fun', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
	.setTimestamp();
  const helpEmbedSetup = new Discord.MessageEmbed()
    .setTitle(`Help for ${message.author.username} | Setup`)
    .setDescription(`⚙️ = *Manage Server Permission Required*\n🗣️ = *Manage Messages Permission Required*\n\n🗣️️️an!announce <channel> <everyone|here|role|none> <message> | Make an announcement, with the option of mentioning @everyone, @here, a role, or nothing.\n\n️️️️️️️🗣️an!qotw <channel> [role] | Post a random question of the week. (You can do this more often, but weekly is recommended, since there are only so many questions.; You also have the option to mention a role / role ID.)`)
    .setFooter('AnnounceBot | Setup', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#4DFFFF')
    .setTimestamp();
  const helpEmbedModeration = new Discord.MessageEmbed()
    .setTitle(`Help for ${message.author.username} | Moderation`)
    .setDescription(`⚙️ = *Manage Server Permission Required*\n\n⚙️an!botmanager <role> | Set a role for a bot manager.`)
		.setColor('#4DFFFF')
		.setFooter('AnnounceBot | Moderation', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
		.setTimestamp();
    // Command
    if (args[0] === 'general') {
      message.channel.send(helpEmbedGeneral);
    } else if (args[0] === 'setup') {
      if (!message.member.hasPermission('MANAGE_SERVER') && !message.member.roles.cache.get(managerRole.managerRole)) {
      return message.channel.send(invalidPermissions);
      } else {
      message.channel.send(helpEmbedSetup);
      }
    } else if (args[0] === 'moderation') {
			if (!message.member.hasPermission('MANAGE_SERVER') && !message.member.roles.cache.get(managerRole.managerRole)) {
				return message.channel.send(invalidPermissions);
			} else {
				message.channel.send(helpEmbedModeration);
			}
		} else if (args[0] === 'fun') {
			message.channel.send(helpEmbedFunOfftopic);
		} else if (args[0] === 'offtopic') {
			message.channel.send(helpEmbedFunOfftopic);
		} else if (!args[0]) {
      message.channel.send(helpEmbed);
    }
  }
}