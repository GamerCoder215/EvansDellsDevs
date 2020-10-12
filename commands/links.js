module.exports = {
  name: 'links',
  aliases: ['l'],
  description: 'Display useful links for the bot.',
  async run(client, message, args) {
    // Discord
    const Discord = require('discord.js')
    // Embeds
    const linkEmbed = new Discord.MessageEmbed()
    .setTitle('Links')
    .setDescription('🔹 CodeClan Support Server: https://discord.gg/kFtBh9y\n🔹 Bot Invite: https://discord.com/api/oauth2/authorize?client_id=756135099195588739&permissions=67624129&scope=bot')
    .setFooter('AnnounceBot | Links', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
		.setColor('#4DFFFF')
    .setTimestamp();
    message.channel.send(linkEmbed);
  }
}