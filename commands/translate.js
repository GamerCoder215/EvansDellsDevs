module.exports = {
	name: 'translate',
	description: 'Translate a message into a specified language.',
	education: true,
	aliases: ['trans', 'trns'],
	async run(client, message, args) {
		// Discord + Config + Translate Module
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		const translate = require('translate');
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
					const spanishTranslation = await (translate(translationMessage, { to: 'es'}))
					const spanishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${spanishTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(spanishEmbed)
				}	else if (args[0] === 'french') {
					const frenchTranslation = await (translate(translationMessage, { to: 'fr'}))
					const frenchEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${frenchTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(frenchEmbed)
				}	else if (args[0] === 'english') {
					const englishTranslation = await (translate(translationMessage, { to: 'en'}))
					const englishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${englishTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(englishEmbed)
				}	else if (args[0] === 'german') {
					const germanTranslation = await (translate(translationMessage, { to: 'de'}))
					const germanEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${germanTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(germanEmbed)
				}	else if (args[0] === 'portugese') {
					const portugueseTranslation = await (translate(translationMessage, { to: 'pt'}))
					const portugueseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${portugeseTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(portugueseEmbed)
				}	else if (args[0] === 'indonesian') {
					const indonesianTranslation = await (translate(translationMessage, { to: 'id'}))
					const indonesianEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${indonesianTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(indonesianEmbed)
				}	else if (args[0] === 'japenese') {
					const japeneseTranslation = await (translate(translationMessage, { to: 'ja'}))
					const japeneseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${japeneseTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(japeneseEmbed)
				}	else if (args[0] === 'chinese') {
					const chineseTranslation = await (translate(translationMessage, { to: 'zh'}))
					const chineseEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${chineseTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(chineseEmbed)
				}	else if (args[0] === 'swahili') {
					const swahiliTranslation = await (translate(translationMessage, { to: 'sw'}))
					const swahiliEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${swahiliTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(swahiliEmbed)
				}	else if (args[0] === 'swedish') {
					const swedishTranslation = await (translate(translationMessage, { to: 'sv'}))
					const swedishEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${swedishTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(swedishEmbed)
				}	else if (args[0] === 'hebrew') {
					const hebrewTranslation = await (translate(translationMessage, { to: 'he'}))
					const hebrewEmbed = new Discord.MessageEmbed()
					.setDescription(`\"${hebrewTranslation}\"`)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp()
					message.channel.send(hebrewEmbed)
				}
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}
