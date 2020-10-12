module.exports = {
	name: 'setversion',
	description: 'Sets the version of Connor (Voice Channel)',
	aliases: ['setv'],
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, 	you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Invalid Perms Embed
		const invalidPerms = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have permission to use this command.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
				return message.channel.send(invalidArgs);
			} else if (!message.member.hasPermission('MANAGE_SERVER') && !message.member.roles.has('762720851261915176')) {
				return message.channel.send(invalidPerms);
			} else {
				const versionChannel = client.channels.cache.get('764949266393071616');
				versionChannel.setName(`v${args[0]}`);
				// Sucess Embed
				const newVerSucessful = new Discord.MessageEmbed()
				.setDescription(`Connor\'s version was sucessfully set to \`${args[0]}\``)
				.setColor(config.blue)
				.setTimestamp();
				message.channel.send(newVerSucessful);
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}