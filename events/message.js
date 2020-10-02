module.exports = async (client, message) => {
	const Discord = require('discord.js')
	const db = require('quick.db')

	const prefix = db.get(`guild_${message.guild.id}_prefix`)
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
		.setColor('#ff0000')
		.setDescription(messages[Math.floor(Math.random() * 3)])
		.setTimestamp();
		return message.reply(invalidChannel);
	}
	} catch (error) {
		console.error(error);
		message.reply(`I\'m sorry, I had an internal error. Paste this error in the support server: \"${error}\"`)
	}
}
