module.exports = {
  name: 'get',
  description: 'Gets a value from the database.',
  database: true,
  aliases: ['retrieve', 'dbget'],
  async run(client, message, args) {
    // Discord, Config & NPM Dependencies
    const Discord = require('discord.js');
    const config = require('../command_config.json');
    const db = require('quick.db');
    // Tables
      // Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
    // Embeds
    // Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
    const dataNotFound = new Discord.MessageEmbed()
    .setDescription(`Sorry ${message.author.username}, there is no data associated with this code.`)
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
    .setFooter(config.name, config.icon)
    .setTimestamp();
    // Command Sequence
    try {
    if (!args[0]) {
      return message.channel.send(invalidArguments);
    } else {
      var keywords = db.get(`value_${args[0]}`)
      if (keywords === undefined) {
      return message.channel.send(dataNotFound);
      } else {
      const dataEmbed = new Discord.MessageEmbed()
      .setTitle(`Code \`${args[0]}\``)
      .setDescription(`The value give is: "${keywords}"`)
      .setFooter(config.name, config.icon)
      .setTimestamp();
      message.channel.send(dataEmbed);
      }
    }
    } catch (error) {
      console.error(error);
      message.reply(config.error);
    }
  }
}
