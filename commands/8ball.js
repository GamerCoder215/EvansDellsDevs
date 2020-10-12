module.exports = {
	name: '8ball',
	description: 'Get a random message from 8 possibilities.',
	aliases: ['eightball', '8b'],
	async run(client, message, args) {
		// Discord
		const Discord = require('discord.js');
		// Table of Possibilities
		var eightball = [
			`Yes`,
			`No`,
			`Maybe`,
			`Maybe not`,
			`Probably`,
			`Probably not`,
			`Not sure`,
			`Definetly.`
		]
		// Command Sequence
			// Embed
			const eightballEmbed = new Discord.MessageEmbed()
			.setColor('#4DFFFF')
			.setDescription('**' + eightball[Math.floor(Math.random() * 8)] + '**')
			.setTimestamp();
			message.channel.send(eightballEmbed);
	}
}