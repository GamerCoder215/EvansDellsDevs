module.exports = {
	name: 'protect',
	description: 'Protects a certain value.',
	database: true,
	aliases: ['prot', 'prt'],
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
    .setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		const dataNotFound = new Discord.MessageEmbed()
    .setDescription(`Sorry ${message.author.username}, there is no data associated with this code.`)
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Whitelist is Enabled
		const whitelistEnabled = new Discord.MessageEmbed()
		.setDescription(`Whitelist is enabled; You cannot use the \`?protect\` command.`)
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Not the Owner
		const invalidOwner = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, but you aren't the owner of this data!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Permission
		const invalidPermission = new Discord.MessageEmbed()
		.setDescription(`You have entered an invalid permission! Click [here](https://docs.connorbot.cf/module-information/database-permissions) for a list of valid permissions.`)
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
		if (!args[1]) return message.channel.send(invalidArguments);
		var valueID = args[0];
		if (!isNaN(valueID) && valueID.includes('-')) return message.channel.send(dataNotFound);
		if (db.get(`whitelist_${valueID}`) === null) {
			db.set(`whitelist_${valueID}`, false)
		}
		if (db.get(`whitelist_${valueID}`) === true) return message.channel.send(whitelistEnabled);
		if (args[1] !== 'admin' && 'mng-server' && 'mng-channels' && 'mng-msg' && 'mng-roles' && 'mng-webh' && 'mng-emoji' && 'mention' && 'ban' && 'kick' && 'external' && 'mute' && 'deafen' && 'move' && 'priority' && 'msg-tts') return message.channel.send(invalidPermission)
		if (db.get(`value_${valueID}_owner`) !== message.author.id) return message.channel.send(invalidOwner);
		db.set(`protection_${valueID}`, args[1])
		message.channel.send(actionSucessful);
		// Protection Sequence
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}
