module.exports = {
	name: 'ping',
	description: 'Ping the bot with an exact runtime.',
	async run(client, message, args) {
		// Discord & Config
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// Command Sequence
		try {
			const latency = Date.now() - message.createdTimestamp;
			message.channel.send(`🏓 Pong! Response Time is ${latency}ms (Milliseconds)!`)
		} catch (error) {
			console.error(error);
			message.reply(config.error)
		}
	}
}