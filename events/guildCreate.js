module.exports = async (client, guild) => {
	// Discord, Config & NPM Dependencies
	const Discord = require('discord.js');
	const db = require('quick.db');
	const config = require('./evt_config.json');
	// Event Sequence
	try {
	const userAdded = await guild.fetchAuditLogs({
		limit: 1,
		type: 'BOT_ADD'
	});
	const botAdd = userAdded.entries.first();
	const { executor, target } = botAdd;
	const addedToServer = new Discord.MessageEmbed()
	.setTitle(`Thanks for Adding Me!`)
	.setDescription(`Hey ${executor.username}, thanks for adding me to the server. Some commands to get you started:\n\n\`?help\` — My Special help Message\n\`?prefix\` <prefix> — Set your own prefix\n?links — Get some useful links!\n\`?ping\` — Ping me to get some reaction time!`)
	.setColor(config.blue)
	.setFooter('Now, to go hate on MEE6...')
	.setTimestamp();
	executor.send(`<@${executor.id}>`, addedToServer);
	console.log(`Joined ${guild.name}!`)
	} catch (error) {
		console.error(error);
		message.reply(config.error)
	}
}