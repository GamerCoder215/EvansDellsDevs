module.exports = {
	name: 'help',
	description: 'Give a help message.',
	aliases: ['h'],
	async run(client, message, args) {
		// Discord, Prefix + Config
		const Discord = require('discord.js');
		const db = require('quick.db');
		const prefix = db.get(`guild_${message.guild.id}_prefix`);
		const config = require('./command_config.json')
		// Timed Out Embed
		const timedOut = new Discord.MessageEmbed()
		.setTitle('<:error:761349813195112448> Error')
		.setDescription('Your message has timed out!')
		.setColor('#ff0000')
		.setTimestamp();
		// Page 1 + 2 Embeds
		const helpPage1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\``)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: '📓General', value: `\`${prefix}help general\``, inline: true },
			{ name: '\u200b', value: '\u200b'},
			{ name: '🎉Fun', value: `\`${prefix}help fun\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '🧑‍🏫 Education', value: `\`${prefix}help education\``, inline: true}
		)
		.setAuthor(`${message.author.username}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor('#00feff')
		.setFooter('ConnorBot', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		const helpPage2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Page 2`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: '🔧Moderation', value: `\`${prefix}help moderation\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '⚙️Settings', value: `\`${prefix}help settings\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '🎵Music', value: `\`${prefix}help music\``, inline: true},
		)
		.setAuthor(`${message.author.username}`, `${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor('#00feff')
		.setFooter('ConnorBot', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
		.setTimestamp();
		// Sub Help Embeds
		const helpGeneral = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | General`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}links**`, value: 'Get some useful links for the bot.'},
			{ name: `**${prefix}help**`, value: 'View the help message.'}
		)
		.setColor('#00feff')
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
			const helpPages = await message.channel.send(helpPage1)
			// Reaction Listener
			helpPages.react('1️⃣').then(() => helpPages.react('2️⃣'));

			const pageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			const pageTurner = helpPages.createReactionCollector(pageFilter, { time: 120000 });
			pageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
			helpPages.edit(helpPage1);
			helpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
		} else {
			helpPages.edit(helpPage2);
			helpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			}
		})
	pageTurner.on('end', (collected) => {
		helpPages.edit(timedOut);
		})
	} else if (args[0] === 'general') {
		return message.channel.send(helpGeneral);
	}

		} catch (error) {
			message.reply(`Internal Error: \"${error}\" | Paste error in support server`)
		}
	}
}