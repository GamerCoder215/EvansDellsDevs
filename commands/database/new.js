module.exports = {
  name: 'new',
  description: 'Creates a new item for a database.',
  database: true,
  aliases: ['create', 'nw'],
  async run(client, message, args) {
    // Discord, Config & NPM Dependencies
    const Discord = require('discord.js');
    const config = require('../command_config.json');
    const db = require('quick.db')
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
    .setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
    // Command Sequence
    try {
    var keywords = args.slice(0).join(' ')
    if (!keywords) {
			return message.channel.send(invalidArguments)
		} else {
		message.delete({ reason: `Needs to be private.` })
    var valueStringID = message.author.username.toString().slice(0, 2).toUpperCase();
    db.add(`valueID`, 1)
    var valueNumberID = db.get(`valueID`);
    var valueID = `${valueStringID}-${valueNumberID}`;
    db.set(`value_${valueID}`, keywords)
    const valueCreated = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
    .setDescription(`Your value has been saved, ${message.author.username}!\nGet it with this ID: \`${valueID}\``)
    .setColor(config.gold)
    .setFooter(config.name, config.icon)
    .setTimestamp();
    message.channel.send(valueCreated);
			}
    } catch (error) {
      console.error(error);
      message.reply(config.error);
    }
  }
}
