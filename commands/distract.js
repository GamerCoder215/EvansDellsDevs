module.exports = {
	name: 'distract',
	description: 'Distract the channel you are in to make a getaway!',
	aliases: ['dis'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord
		const Discord = require('discord.js');
		// Tables
		var distractionMessages = [
			`${message.author.username} distracted the channel!`,
			`Get distracted. - ${message.author.username}`,
			`${message.author.username} is distracting you while he escapes!`,
			`Haha, ${message.author.username} distracted you!`,
			`You just got distracted by ${message.author.username}`
		]
		// Embed
		const distractionEmbed = new Discord.MessageEmbed()
		.setDescription(distractionMessages[Math.floor(Math.random() * 5)])
		.setColor('#4DFFFF')
		.setImage('https://media1.tenor.com/images/daa01a90d87c517623ae91b0a7498e9e/tenor.gif?itemid=18175466')
		.setTimestamp();
		message.channel.send(distractionEmbed);
	}
}