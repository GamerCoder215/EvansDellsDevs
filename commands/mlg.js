module.exports = {
	name: 'mlg',
	description: 'Makes an image that makes them look fly.',
	aliases: ['supercool', 'cool'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config + Canvas
		const Discord = require('discord.js');
		const Canvas = require('canvas');
		const config = require('./command_config.json');
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
		// Get User from Mention function
		function getUserFromMention(mention) {
			if (!mention) return;
			if (mention.startsWith('<@') && mention.endsWith('>')) {
				var mentionID = mention.replace(/[<@>]/g, '')
				return (mentionID);
			}
		}
		// Command Sequence
		try {
			const canvas = Canvas.createCanvas(720, 720);
			const ctx = canvas.getContext('2d');
			const givenUser = getUserFromMention(args[0]);
			if (!args[0]) {
				return message.channel.send(invalidArguments)
			} else {
			// Avatar Background
			const background = await Canvas.loadImage(givenUser.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
			const mlgGlasses = await Canvas.loadImage('https://appstickers-cdn.appadvice.com/1153717858/818874876/184aec1dfa6c9cccb2213863d8b28d8f-1.png')
			ctx.drawImage(mlgGlasses, 100, 120, 500, 500)
			const mlgSmoke = await Canvas.loadImage('http://cdn130.picsart.com/240052267051211.png')
			ctx.drawImage(mlgSmoke, 100, 140, 500, 500)
			// Sending the MLG picture.
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'mlg-image.png');
			message.channel.send('', attachment)
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}