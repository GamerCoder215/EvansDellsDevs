module.exports = {
  name: 'kick',
  description: 'Kicks a user.',
  guildOnly: true,
  aliases: ['kck', 'boot'],
  async run(client, message, args) {
    // Discord, Config & NPM Dependencies
    const Discord = require('discord.js');
    const config = require('../command_config.json');
		// In-App Dependencies
		const guild = client.guilds.cache.get(message.guild.id)
    // Tables
      // Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
    var invalidPermissionMessages = [
			`I\'m sorry ${message.author.username}, but you do not have permission to use this command.`,
			`Hey ${message.author.username}, you don\'t have the correct permissions to use this command!`,
			`Stop, you don\'t have the permission, ${message.author.username}`,
			`${message.author.username} can\'t use this command because he lacks the permissions to do so.`,
			`Get the permissions to use this command, ${message.author.username}`,
			`Connor found out you don\'t have the permissions, ${message.author.username}!`
		]
    var sucessMessages = [
			`Your action was sucessful, ${message.author.username}`,
			`${message.author.username}\'s action was sucessful.`,
			`Congradulations ${message.author.username}, your action was sucessful.`,
			`Excellent! ${message.author.username} had their action a sucess.`,
			`Connor found out about your action ${message.author.username}, \nand he helped it become a sucess.`
		]
    // Embeds
      // User Unbannable
      const userUnkickable = new Discord.MessageEmbed()
      .setDescription('This user cannot be kicked.')
      .setColor(config.red)
      .setFooter(config.name, config.icon)
      .setTimestamp();
      // Invalid Args Embed
  		const invalidArguments = new Discord.MessageEmbed()
  		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
  		.setColor(config.red)
  		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  		.setFooter(config.name, config.icon)
  		.setTimestamp();
      // Invalid Permission Embed
      const invalidPermissions = new Discord.MessageEmbed()
  		.setDescription(invalidPermissionMessages[Math.floor(Math.random() * 6)])
  		.setColor('#ff0000')
  		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  		.setFooter(config.name, config.icon)
  		.setTimestamp();
      // Action Sucessful Embed
      const actionSucessful = new Discord.MessageEmbed()
  		.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
  		.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  		.setColor('#D8D52B')
  		.setFooter('ConnorBot', config.icon)
  		.setTimestamp();
    // Functions
      // Get User from ID Function
      function getIDFromMention(mention) {
        if (!mention) return;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
          var mentionID = mention.replace(/[<@!>]/g, '')
          return (mentionID);
        } else return (mention);
      }
    // Command Sequence
    try {
    const reason = args.slice(1).join(' ');
    const targetUser = client.users.cache.get(getIDFromMention(args[0]));
		const target = guild.member(targetUser);
    // Security Checks
    if (!args[0]) return message.channel.send(invalidArguments); // Checks if a user is given
    if (!reason) return message.channel.send(invalidArguments); // Checks if a reason is given
    if (!target.hasPermission('ADMINISTRATOR') && target.kickable) {
		if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(invalidPermissions); // Checks if the user has permission
    // Ban Sequence
    target.kick({ reason: `${reason}` })
    target.send(`<@${targetUser.id}>\nYou were kicked in ${message.guild.name} for: \"${reason}\".`);
    message.channel.send(actionSucessful);
		} else return message.channel.send(userUnkickable); // Checks if the target is kickable
    } catch (error) {
      console.error(error);
      message.reply(config.error);
    }
  }
}
