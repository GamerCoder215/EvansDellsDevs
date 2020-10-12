module.exports = {
	name: 'rebirth',
	description: 'Rebirths after a certain amount of messages.',
	aliases: ['relive', 'rebrth', 'reb'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		const db = require('quick.db');
		// Discord Dependencies
		const guild = client.guilds.cache.get(config.serverID);
		const member = guild.member(message.author);
		// Embeds
		const invalidMessages = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription('You do not have the required messages sent to rebirth (**2,000**)!')
		.setColor(config.red)
		.setTimestamp();
		const overRebirth = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription('You have exceeded the rebirth limit! You stick with your current role.')
		.setColor(config.red)
		.setFooter('Next time, use \`?prestige\`.')
		.setTimestamp();
		// Command Sequence
		try {
		if (db.get(`guild_messages.${message.author.id}_count`) >= 2000) {
			// Database Sets
			db.add(`guild_rebirths.${message.author.id}`, 1)
			db.add(`guidl_rebirths.${message.author.id}.permanent`, 1)
			db.set(`guild_messages.${message.author.id}.count`, 0)
			// Embed
			const rebirthSucessful = new Discord.MessageEmbed()
			.setDescription('Your rebirth was sucessful!')
			.setColor(config.blue)
			.setTimestamp();
			message.channel.send(rebirthSucessful)
			// Add Role
			if (db.get(`guild_rebirths_${message.author.id}`) === 1) {
				member.roles.add('764383895474012192')
			} else if (db.get(`guild_rebirths_${message.author.id}`) === 2) {
				member.roles.remove('764383895474012192')
				member.roles.add('764383986704187433')
			} else if (db.get(`guild_rebirths_${message.author.id}`) === 3) {
				member.roles.remove('764383986704187433')
				member.roles.add('764384070213304350')
			} else {
				return message.channel.send(overRebirth);
			}
			// Log Send
			const userRebirth = new Discord.MessageEmbed()
			.setTitle(`Member \`${message.author.username}\` Rebirthed`)
			.setDescription(`Old Level: ${(db.get(`guild_rebirths_${message.author.id}`) * 1) - (1 * 1)}\n\nNew Level: ${db.get(`guild_rebirths_${message.author.id}`)}`)
			.setColor(config.blue)
			.setTimestamp();
			client.channels.cache.get('764365687770578984').send(userRebirth)
		} else {
			return message.channel.send(invalidMessages);
		}
		} catch (error) {
			console.error(error)
			message.reply(config.error)
		}
	}
}