module.exports = {
	name: 'mean',
	description: 'Find the mean of a set of numbers',
	education: true,
	aliases: ['mn', 'average', 'avg'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		const math = require('mathjs');
	}
}