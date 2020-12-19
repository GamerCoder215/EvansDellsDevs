module.exports = {
	name: 'cmdinfo',
	description: 'Gets information about a command.',
	aliases: ['commandinfo', 'cmdinformation', 'commandinformation'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const db = require('quick.db');
		const config = require('../command_config.json');

		var prefix = db.get(`guild_${message.guild.id}_prefix`) || '?';
		// Tables
		var invalidCommandMessages = [
			`Hey ${message.author.username}, this command does not exist.`,
			`Sorry ${message.author.username}, this command isn't real!`,
			`Seems like this command doesn't exist, ${message.author.username}.`,
			`I don't know, seems like this command doesn't exist, ${message.author.username}!`,
			`Oh Wow! ${message.author.username}'s command doesn't exist`,
			`Looks like ${message.author.username}'s command doesn't exist. Sorry dude.`
		]
		// Embeds
		const invalidCommand = new Discord.MessageEmbed()
		.setTitle('Command Not Found')
		.setURL('https://discord.gg/upx6SqG')
		.setDescription(invalidCommandMessages[Math.floor(Math.random() * 6)])
		.setColor(config.red)
		.setFooter('Psst. Click on the title if it\'s an issue.', config.icon)
		.setTimestamp();
		try {
		const command = client.commands.get(args[0]);
		if (command === undefined) {
			return message.channel.send(invalidCommand);
		} else {
		// Get Commands
		var education = command.education;
		var guildOnly = command.guildOnly;
		var database = command.database;
		var aliases = command.aliases;
		if (aliases === undefined) aliases = 'None';
		var advtools = command.advtools;
		if (education === undefined) education = 'false';
		if (guildOnly === undefined) guildOnly = 'false';
		if (database === undefined) database = 'false';
		if (advtools === undefined) advtools = 'false';
		const cmdInfoEmbed = new Discord.MessageEmbed()
		.setTitle(`Command \`${command.name}\``)
		.addFields(
			{ name: 'Name', value: command.name},
			{ name: 'Description', value: command.description},
			{ name: 'Premium Status', value: `Education: ${education}\nDatabase: ${database}\nAdv. Tools: ${advtools}`},
			{ name: 'Aliases', value: aliases.join(`, `) },
			{ name: 'Guild Only', value: guildOnly},
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.channel.send(cmdInfoEmbed);
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}