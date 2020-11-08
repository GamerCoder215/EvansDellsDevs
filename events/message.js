module.exports = async (client, message) => {
	// Discord, Config & Dependencies
	const Discord = require('discord.js');
	const config = require('./evt_config.json');
	const db = require('quick.db');
	// In-App Dependencies
	const guild = client.guilds.cache.get(config.serverID)
	const member = guild.member(message.author);
	// Leveling
	const multiplyer = db.get(`guild_messages_${message.author.id}_multiplyer`)
	// Add 1 message
	db.add(`guild_messages_${message.author.id}_count`, multiplyer);
	db.add(`guild_messages_${message.author.id}_count_permanent`, 1);
	db.add(`guild_messages`, multiplyer);
	// Level Check
	if (db.get(`guild_messages_${message.author.id}_count`) === 5) {
		const leveledUpEmbed1 = new Discord.MessageEmbed()
		.setTitle(`Member \`${message.author.username}\` leveled up`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Old Level: 0\n\nNew Level: **1**`)
		.setColor(config.pink)
		.setTimestamp();
		client.channels.cache.get('764365687770578984').send(`<@${message.author.id}>`, leveledUpEmbed1)
		member.roles.add('764364932556390430')
		message.author.send(`You\'ve leveled up to Level **1**! Congradulations!`)
	} else if (db.get(`guild_messages_${message.author.id}_count`) === 300) {
		const leveledUpEmbed2 = new Discord.MessageEmbed()
		.setTitle(`Member \`${message.author.username}\` leveled up`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Old Level: 1\n\nNew Level: **2**`)
		.setColor(config.pink)
		.setTimestamp();
		client.channels.cache.get('764365687770578984').send(`<${message.author.id}>`, leveledUpEmbed2);
		member.roles.add('764365030975078410');
		db.set(`guild_leveling_${message.author.id}`, 2)
		message.author.send(`You\'ve leveled up to Level **2**! Congradulations!`);
	} else if (db.get(`guild_messages_${message.author.id}_count`) === 750) {
		const leveledUpEmbed3 = new Discord.MessageEmbed()
		.setTitle(`Member \`${message.author.username}\` leveled up`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Old Level: 2\n\nNew Level: **3**`)
		.setColor(config.pink)
		.setTimestamp();
		client.channels.cache.get('764365687770578984').send(`<${message.author.id}>`, leveledUpEmbed3);
		member.roles.add('764365151465242655');
		db.set(`guild_leveling_${message.author.id}`, 3)
		message.author.send(`You\'ve leveled up to Level **3**! Congradulations!`);
	} else if (db.get(`guild_messages_${message.author.id}_count`) === 1500) {
		const leveledUpEmbed4 = new Discord.MessageEmbed()
		.setTitle(`Member \`${message.author.username}\` leveled up`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Old Level: 3\n\nNew Level: **4**`)
		.setColor(config.pink)
		.setTimestamp();
		client.channels.cache.get('764365687770578984').send(`<${message.author.id}>`, leveledUpEmbed4);
		member.roles.add('764365218385100822');
		db.set(`guild_leveling_${message.author.id}`, 4)
		message.author.send(`You\'ve leveled up to Level **4**! Congradulations!`);
	}
		// Reaction Collector & Naming
	if (message.channel.id === '764951000191991828') {
		message.react('764139448967233576').then(() => message.react('764139448791203901'))
		const suggestionFilter = (reaction, user) => {
			return ['764139448967233576', '764139448791203901'].some(emoji => reaction.emoji.name === emoji || reaction.emoji.id === emoji)
	}
			const suggestionCollector = message.createReactionCollector(suggestionFilter, { dispose: true })
			suggestionCollector.on('collect', (reaction, user) => {
				if (reaction.emoji.id === '764139448967233576') {
					db.add(`suggestions_${message.id}_upvotes`, 1)
				} else if (reaction.emoji.id === '764139448791203901') {
					db.add(`suggestions_${message.id}_downvotes`, 1)
				}
			})
			suggestionCollector.on('remove', (collected) => {
				if (reaction.emoji.id === '764139448967233576') {
					db.subtract(`suggestions_${message.id}_upvotes`, 1)
				} else if (reaction.emoji.id === '764139448791203901') {
					db.subtract(`suggestions_${message.id}_downvotes`, 1)
				}
			})
			// Upvotes check
			if (db.get(`suggestions_${message.id}_upvotes`) === 25) {
				message.pin;
				message.author.send(`Your suggestion in Connor Corner has reached 25 or more upvotes, please wait for approval...`)
			}
			// Downvotes check
			if (db.get(`suggestions_${message.id}_downvotes`) === 25) {
				message.delete();
				message.author.send(`Your suggestion in Connor Corner was deleted because it had 25 or more downvotes!`)
			} // Age check
			const week = 1000 * 60 * 60 * 24 * 7 
			if (message.createdTimestamp <= Date.now() - week && !message.pinned) {
				message.delete();
				message.author.send(`Your suggestion was deleted because it wasn\'t pinned and it was older than one week!`)
			}
			
	}
	// Command Send & Attributes
	var prefix = '?'
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;

  const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if (!command) return;

	try {
		if (command) command.run(client, message, args);
		// Detects if it is in a DM
		if (command.guildOnly && message.channel.type === 'dm') {
		var messages = [
			`Sorry ${message.author.username}, you need to be in a guild to execute this command!`,
			`Oops ${message.author.username}, this command is onlly executable in a server.`,
			`Please use this command in a server, ${message.author.username}`
		]
		const invalidChannel = new Discord.MessageEmbed()
		.setTitle('Error')
		.setColor(config.red)
		.setDescription(messages[Math.floor(Math.random() * 3)])
		.setTimestamp();
		return message.reply(invalidChannel);
	}
	} catch (error) {
		console.error(error);
	}
}