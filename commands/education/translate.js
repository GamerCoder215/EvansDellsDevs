module.exports = {
	name: 'translate',
	description: 'Translate a message into a specified language.',
	education: true,
	aliases: ['trans', 'trns'],
	async run(client, message, args) {
		// Discord + Config + Translate Module
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const translate = require('translate-google');
		// Supported Languages
		const languages = new Discord.MessageEmbed()
		.setTitle('Supported Languages')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription('• English\n• Spanish\n• French\n• German\n• Portuguese\n• Indonesian\n• Japenese\n• Chinese\n• Swahili\n• Hebrew\n• Swedish')
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
		var translationMessage = args.slice(1).join(' ')
			if (!args[0]) {
				return message.channel.send(languages);
			} else {
				if (!isNaN(translationMessage)) {
					return message.channel.send(invalidArguments);
				} else {
				if (args[0] === 'spanish') {
					translate(translationMessage, {to: 'es'}).then(res => {
					const spanishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(spanishEmbed)
					})
				}	else if (args[0] === 'french') {
					translate(translationMessage, {to: 'fr'}).then(res => {
					const frenchEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(frenchEmbed)
					});
				}	else if (args[0] === 'english') {
					translate(translationMessage, {to: 'en'}).then(res => {
					const englishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(englishEmbed)
					});
				}	else if (args[0] === 'german') {
					translate(translationMessage, {to: 'de'}).then(res => {
					const germanEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(germanEmbed)
					});
				}	else if (args[0] === 'portuguese') {
					translate(translationMessage, {to: 'pt'}).then(res => {
					const portugueseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(portugueseEmbed)
					});
				}	else if (args[0] === 'indonesian') {
					const indonesianTranslation = await translate(translationMessage, {to: 'id'}).then(res => {
					const indonesianEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(indonesianEmbed)
					})
				}	else if (args[0] === 'japenese') {
					translate(translationMessage, {to: 'ja'}).then(res => {
					const japeneseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(japeneseEmbed)
					});
				}	else if (args[0] === 'chinese') {
					translate(translationMessage, { to: 'zh-cn' }).then(res => {
					const chineseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(chineseEmbed)
					});
				}	else if (args[0] === 'swahili') {
					translate(translationMessage, { to: 'sw' }).then(res => {
					const swahiliEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(swahiliEmbed)
					});
				}	else if (args[0] === 'swedish') {
					translate(translationMessage, { to: 'sv' }).then(res => {
					const swedishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(swedishEmbed)
					});
				}	else if (args[0] === 'hebrew') {
					translate(translationMessage, {to: 'iw' }).then(res => {
					const hebrewEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${res}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(hebrewEmbed)
					});
				}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}
