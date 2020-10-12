module.exports = async (client, message) => {
	const Discord = require('discord.js')
	const prefix = 'an!'
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;

  const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if (!command) return;

	try {
		if (command) command.run(client, message, args);
		// Detects if it is in a DM
		if (command.guildOnly && message.channel.type === 'dm') {
		const invalidChannel = new Discord.MessageEmbed()
		.setTitle('Error 05')
		.setColor('#ff0000')
		.setDescription('You need to be in a guild to execute this comand!')
		.setTimestamp();
	return message.reply(invalidChannel);
	}
	} catch (error) {
		console.error(error);
		message.reply(`Internal Error: "${error}"; Contact GamerCoder__#2640 / Support Server (Copy this error)`)
	}
}