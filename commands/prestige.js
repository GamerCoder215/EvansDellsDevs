module.exports = {
	name: 'prestige',
	description: 'Do a prestige thing that gives you a special role after a certain amount of messages.',
	aliases: ['restart', 'res', 'pres'],
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
		.setDescription('You have not sent enough messages. You need **rebirth 3+** equipped and at least **5,000** messages sent (after that)!')
		.setColor(config.red)
		.setTimestamp();
		const overPrestige = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription('If you are seeing this, you are godlike. You have spoken your way up to the highest of the highest, and have unlocked all of the chat features. Congradulations!')
		.setColor(config.red)
		.setFooter('Maybe just brag now...')
		.setTimestamp();
		// Command Sequence
		try {
			if (db.get(`guild_rebirths_${message.author.id}`) >= 3 && db.get(`guild_messages_${message.author.id}_count`) >= 5000) {
				// Database Sets
				db.set(`guild_messages_${message.author.id}_count`, 0)
				db.set(`guild_rebirths.${message.author.id}`, 0)
				db.add(`guild_prestiges.${message.author.id}`, 1)
				db.add(`guid_prestiges.${message.author.id}_permanent`, 1)
				// Role add
				if (db.get(`guild.prestiges.${message.author.id}`) === 1) {
					member.roles.remove('764384070213304350')
					member.roles.add('764384208893640714')
				}
				// Log & User Sends
				const prestigeSucessful = new Discord.MessageEmbed()
				.setDescription('Your prestige was sucessful!')
				.setColor(config.blue)
				.setTimestamp();
				message.channels.send(prestigeSucessful);
				const userPrestige = new Discord.MessageEmbed()
				.setTitle(`Member ${message.author.username} prestiged`)
				.setDescription(`Old Level: ${(db.get(`guild_prestiges_${message.author.id}`) * 1) - (1 * 1)}\n\nNew Level: ${db.get(`guild_prestiges_${message.author.id}`)}`)
				client.channels.cache.get('764365687770578984').send(userPrestige);
			} else {
				return message.channel.send(invalidMessages);
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}