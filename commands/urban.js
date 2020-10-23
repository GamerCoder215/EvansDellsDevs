module.exports = {
	name: 'urban',
	description: 'Looks up something from the urban dictionary.',
	aliases: ['urbn'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		const fetch = require('node-fetch');
		const querystring = require('querystring');
		// Tables
		var invalidArgumentMessages = [
		`Sorry ${message.author.username}, you have provided invalid arguments.`,
		`Hey there ${message.author.username}! You have provided some invalid arguments.`,
		`Let's see ${message.author.username}, you have some invalid arguments.`,
		`Hey ${message.author.username}, you have invalid arguments!`,
		`Please provide some valid arguments, ${message.author.username}`
		]
		var invalidQueryMessages = [
			`Sorry ${message.author.username}, your query wasn not found.`,
			`Looks like the query didn't match anything, ${message.author.username}.`,
			`Bruh, enter a valid query, ${message.author.username}!`,
			`C'mon, give me a valid query ${message.author.username}.`,
			`Would ya look at that? ${message.author.username}'s query wasn't found. I wonder why...`
		]
		// Embeds
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Query not Found Embed
		const invalidQuery = new Discord.MessageEmbed()
		.setDescription(invalidQueryMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args.length) {
				return message.channel.send(invalidArguments);
			} else {
				const query = querystring.stringify({ term: args.join(' ') });
  			const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
				if (!list.length) {
					return message.channel.send(invalidQuery);
				} else {
					const [answer] = list;
					const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
					const urbanEmbed = new Discord.MessageEmbed()
					.setTitle(answer.word)
					.setURL(answer.permalink)
					.setAuthor(message.author.username, message.author.displayAvatarURL({ dyanmic: true, format: 'png', size: 1024}))
					.addFields(
						{ name: 'Definition', value: trim(answer.definition, 1024)},
						{ name: 'Example', value: trim(answer.example, 1024)},
						{ name: 'Ratings', value: `${answer.thumbs_up} upvotes | ${answer.thumbs_down} downvotes`}
					)
					.setColor(config.gold)
					.setFooter(config.name, config.icon)
					.setTimestamp();
					message.channel.send(urbanEmbed);
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}