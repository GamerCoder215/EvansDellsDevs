module.exports = {
	name: '8ball',
	description: 'Provide 8 possibilities to a question.',
	aliases: ['eightball', '8b', 'eightb'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		// 8 ball Table
		var eightBall = [
			`Yes`,
			`No`,
			`Maybe`,
			`Maybe Not`,
			`Definetly`,
			`Definetly Not`,
			`Not Sure`,
			`Ask Again.`
		]
		// Command Sequence
		try {
		// Embed
		const eightBallEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(eightBall[Math.floor(Math.random() * 8)])
		.setColor(config.blue)
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		message.channel.send(eightBallEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}