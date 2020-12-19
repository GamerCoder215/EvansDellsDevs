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
	.setDescription(`Thanks for adding me to the server! Some commands to get you started:\n\n\`?help\` — My Special help Message\n\`?prefix\` <prefix> — Set your own prefix\n?links — Get some useful links!\n\`?ping\` — Ping me to get some reaction time!`)
	.setColor(config.blue)
	.setFooter('Now, to go hate on MEE6...')
	.setTimestamp();
	executor.send(`<@${executor.id}>`, addedToServer);
	console.log(`Joined ${guild.name}!`)
	} catch (error) {
		console.error(error);
		var errorCode = error.code;
		if (errorCode == 50013) {
			let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(addedToServer);
		}
		message.reply(config.error);
	}
}