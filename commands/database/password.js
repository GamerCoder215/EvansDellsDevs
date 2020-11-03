module.exports = {
	name: 'password',
	description: 'Sets the password for accessing something.',
	database: true,
	aliases: ['pass', 'pswrd'],
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
		var sucessMessages = [
			`Your action was sucessful, ${message.author.username}`,
			`${message.author.username}\'s action was sucessful.`,
			`Congradulations ${message.author.username}, your action was sucessful.`,
			`Excellent! ${message.author.username} had their action a sucess.`,
			`Connor found out about your action ${message.author.username}, \nand he helped it become a sucess.`
		]
    // Embeds
    // Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Whitelist enabled
		const whitelistEnabled = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, but whitelist is enabled! Please disable if you want to use a password.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Not the Owner / Not Whitelisted
		const invalidAccess = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have access to this data.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Code does not Exist
		const invalidCode = new Discord.MessageEmbed()
		.setDescription(`I had some trouble finding the code, maybe you mis-spelled it.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Action Sucessful Embed
    const actionSucessful = new Discord.MessageEmbed()
  	.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
  	.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
  	.setColor('#D8D52B')
  	.setFooter('ConnorBot', config.icon)
  	.setTimestamp();
		// Command Sequence
		try {
		if (!args[0]) return message.channel.send(invalidArguments);
		var password = args.slice(1).join(' ');
		if (!password) return message.channel.send(invalidArguments);
		if (db.get(`value_${args[0]}_owner`) !== message.author.id) return message.channel.send(invalidAccess);
		if (db.get(`value_${args[0]}`) === null) return message.channel.send(invalidCode);
		db.set(`password_${args[0]}`, password)
		message.channel.send(actionSucessful);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}