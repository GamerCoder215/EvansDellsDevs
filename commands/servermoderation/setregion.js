module.exports = {
	name: 'setregion',
	guildOnly: true,
	description: 'Sets the server\'s region.',
	aliases: ['setcountry', 'setreg', 'setcout'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// In-App
		const guild = message.guild;
		// Tables
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
		// Same Channel
		const notARegion = new Discord.MessageEmbed()
		.setDescription(`The region you have given does not exist, or was deprecated.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Permissions
		const invalidPermissions = new Discord.MessageEmbed()
		.setDescription(invalidPermissionMessages[Math.floor(Math.random() * 6)])
		.setColor('#ff0000')
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		// Action Sucessful
		const actionSucessful = new Discord.MessageEmbed()
		.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
		.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Get Region Function
		function getRegion(region) {
			if (!region) return;
			if (region === 'us') {
				return ('us-central');
			} else if (region === 'use') {
				return ('us-east');
			} else if (region === 'uss') {
				return ('us-south');
			} else if (region === 'usw') {
				return ('us-west');
			} else if (region === 'sng') {
				return ('singapore');
			} else if (region === 'soa') {
				return ('south-africa');
			} else if (region === 'rus') {
				return ('russia');
			} else if (region === 'jap') {
				return ('japan');
			} else if (region === 'ind') {
				return ('india');
			} else if (region === 'hnkn') {
				return ('hong-kong'); 
			} else if (region === 'eu') {
				return ('europe');
			} else if (region === 'br') {
				return ('brazil');
			}
		} 
		try {
			if (!args[0]) return message.channel.send(invalidArguments);
			if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(invalidPermissions);
			guild.setRegion(getRegion(args[0]))
			.catch(error => message.channel.send(notARegion));
			message.channel.send(actionSucessful);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}