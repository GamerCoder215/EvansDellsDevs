module.exports = {
	name: 'help',
	description: 'Give a help message.',
	aliases: ['h'],
	async run(client, message, args) {
		// Discord + Prefix
		const Discord = require('discord.js');
		const prefix = db.get(`guild_${message.guild.id}_prefix`);
		// Tables
		var greetings = [
			`Hiya ${message.author.username}, I\'m Connor! Here's a little help with my modules:`,
			`Hey there ${message.author.username}, my name is Connor. Here\'s my help page:`,
			`Hey ${message.author.username}, Connor here. I\'m gonna give you a help message, that says:`,
			`Hi ${message.author.username}, my name is Connor. I\'m going to give you my help message now:`,
			`Connor is here, ${message.author.username}🎉! Here\'s my help message:`
		]
		const helpEmbed = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\``)
		.addFields(
			{ name: '📓General', value: `\`${prefix}help general\`\n\n`, inline: true },
			{ name: '🎉Fun', value: `\`${prefix}help fun\`\n\n`, inline: true },
			{ name: '🔧Moderation', value: `\`${prefix}help moderation\`\n\n`, inline: true },
			{ name: '📊Leveling', value: `\`${prefix}help leveling\`\n\n`, inline: true },
			{ name: '➕Education', value: `\`${prefix}help education\`\n\n`, inline: true },
			{ name: '🎧Music', value: `\`${prefix}help music\`\n\n`},
			{ name: '⚙️Settings', value: `\`${prefix}help settings\`\n\n`, inline: true }
		)
		.setColor('#D8D52B')
		.setTimestamp();
	}
}
