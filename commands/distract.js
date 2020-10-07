module.exports = {
	name: 'distract',
	description: 'Distract the channel (or make a diversion)',
	aliases: ['diversion', 'divert', 'distract'],
	guildOnly: true,
	async run(client, message, args) {
		message.delete()
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		// Distraction Table
		var distractionMessages = [
			`Ha! ${message.author.username} distracted you!`,
			`Get distracted by ${message.author.username}.`,
			`You better be ready, because ${message.author.username} just distracted you!`,
			`Get chasing, because you got distracted by ${message.author.username}!`,
			`${message.author.username} created a distraction!`
		]
		// Diversion Table
		var diversionMessages = [
			`${message.author.username} created a diversion and got away!`,
			`The diversion that ${message.author.username} created was sucessful and they got away!`,
			`OOF! Your attention was diverted by ${message.author.username}!`,
			`Distractions are good, but you got distracted too by ${message.author.username}\'s diversion!`,
			`Wow, you attention was diverted to ${message.author.username}\'s diversion.`
		]
		// Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		// Command Sequence
		try {
			// Distraction Embed
			const distractionEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setDescription(distractionMessages[Math.floor(Math.random() * 5)])
			.setImage('https://media1.tenor.com/images/daa01a90d87c517623ae91b0a7498e9e/tenor.gif?itemid=18175466')
			.setFooter('ConnorBot', config.icon)
			.setColor(config.blue)
			.setTimestamp();
			// Diversion Embed
			const diversionEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setDescription(diversionMessages[Math.floor(Math.random() * 5)])
			.setImage('https://vignette.wikia.nocookie.net/henrystickmin/images/9/95/Diversion_Distraction_toppats.gif')
			.setFooter('ConnorBot', config.icon)
			.setColor(config.blue)
			.setTimestamp();
			// Invalid Arguments Embed
			const invalidArguments = new Discord.MessageEmbed()
			.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
			.setColor('#ff0000')
			.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
			.setFooter('ConnorBot', config.icon)
			.setTimestamp();
			// Argument Check
			if (!args[0]) {
				message.channel.send(distractionEmbed)
			} else if (args[0] === 'diversion') {
				message.channel.send(diversionEmbed)
			} else {
				return message.channel.send(invalidArguments);
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}