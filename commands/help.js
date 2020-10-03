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
		const helpFun1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}pokemon**`, value: `Find out your dream pokemon.`},
			{ name: `**${prefix}rickroll** `, value: `Rickroll the channel!`},
			{ name: `**${prefix}clap** <message>`, value: `Make👏 a👏 message👏 look👏 like👏 this👏`},
			{ name: `**${prefix}shout** <message>`, value: `**__📣 MAKE A MESSAGE LOOK LIKE THIS📣__**`},
			{ name: `**${prefix}distract** [diversion|distraction]`, value: `Distract the channel (or create a diversion.)`}
		)
		.setColor('#00feff')
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		const helpFun2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}number** <min-value> <max-value>`, value: `Generate a number from a specified area.`},
			{ name: `**${prefix}8ball**`, value: `Generate a random answer from 8 possibilities.`},
			{ name: `**${prefix}ingrammar** <message>`, value: `Remove al of the vowels and y's in a message. \"Lke ths r tht.\"`},
			{ name: `**${prefix}color**`, value: `Generate a random color from the basic rainbow.`},
			{ name: `**${prefix}mlg** [user-mention|user-id]`, value: `Get a MLG user avatar. If nothing, you'll get your own.`}
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
	} else if (args[0] === 'fun') {
		const funHelpPages = await message.channel.send(helpFun1)
		// Reaction Listener
		funHelpPages.react('1️⃣').then(() => funHelpPages.react('2️⃣')).then(() => funHelpPages.react('3️⃣'));

		const funPageFilter = (reaction, user) => {
			return ['1️⃣', '2⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		const funPageTurner = funHelpPages.createReactionCollector(funPageFilter, { time: 120000 });
		funPageTurner.on('collect', (reaction,user) => {
			if (reaction.emoji.name === '1⃣') {
				funHelpPages.edit(helpFun1);
			} else if (reaction.emoji.name === '2⃣'){
				funHelpPages.edit(helpFun2);
			}
		})
	}

		} catch (error) {
			message.reply(`Internal Error: \"${error}\" | Paste error in support server`)
		}
	}
}
