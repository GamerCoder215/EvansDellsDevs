module.exports = {
	name: 'help',
	description: 'Give a help message.',
	aliases: ['h'],
	async run(client, message, args) {
		// Discord, Prefix + Config
		const Discord = require('discord.js');
		const db = require('quick.db');
		var prefix = db.get(`guild_${message.guild.id}_prefix`) || '?';
		const config = require('./command_config.json')
		// Timed Out Embed
		const timedOut = new Discord.MessageEmbed()
		.setTitle('❌ Error')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription('Your message has timed out!')
		.setColor('#ff0000')
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Page 1 + 2 Embeds
		const helpPage1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Free Modules`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: '📓General', value: `\`${prefix}help general\``, inline: true },
			{ name: '\u200b', value: '\u200b'},
			{ name: '🎉Fun', value: `\`${prefix}help fun\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '⚙️Settings', value: `\`${prefix}help settings\``, inline: true},
		)
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpPage2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Page 2 | Free Modules (Page 2)`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: '🔧Moderation', value: `\`${prefix}help moderation\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '🏠 Server Moderation', value: `\`${prefix}help servermod\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '🎵 Music', value: `\`${prefix}help music\``, inline: true},
		)
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpPage3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Page 3 | Paid Modules`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: '🧑‍🏫 Education', value: `\`${prefix}help education\``, inline: true},
			{ name: '\u200b', value: '\u200b'},
			{ name: '<:database:766527107651338250> Database', value: `\`${prefix}help database\``},
			{ name: '\u200b', value: '\u200b'},
			{ name: '🛠️ Advanced Tools', value: `\`${prefix}help advtools\``}
		)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Sub Help Embeds
		const helpGeneral = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | General`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}links**`, value: 'Get some useful links for the bot.'},
			{ name: `**${prefix}help**`, value: 'View the help message.'},
			{ name: `**${prefix}ping**`, value: 'Ping me with an exact runtime.'}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpFun1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}pokemon**`, value: `Find out your dream pokemon.`},
			{ name: `**${prefix}turn** <message>`, value: `sıɥʇ ǝʞıl ʞool ǝɓɐssǝɯ ɐ ǝʞɐW`},
			{ name: `**${prefix}binary** <message>`, value: `Turns a message into binary code!`},
			{ name: `**${prefix}shout** <message>`, value: `**__📣 MAKE A MESSAGE LOOK LIKE THIS📣__**`},
			{ name: `**${prefix}distract** [diversion]`, value: `Distract the channel (or create a diversion.)`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpFun2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}number** <min-value> <max-value>`, value: `Generate a number from a specified area.`},
			{ name: `**${prefix}8ball**`, value: `Generate a random answer from 8 possibilities.`},
			{ name: `**${prefix}ingrammar** <message>`, value: `Remove all of the vowels and y's in a message. \"Lke ths r tht.\"`},
			{ name: `**${prefix}color**`, value: `Generate a random color from the basic rainbow.`},
			{ name: `**${prefix}mlg** [user-mention|user-id]`, value: `Get a MLG user avatar. If nothing, you'll get your own.`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpFun3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun | Page 3`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}game**`, value: `Find your ideal video game.`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpEducation1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education`)
		.setAuthor(`${message.author.username} | Math`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}add** <first> <second> [third] [fourth]`, value: `Add two numbers.`},
			{ name: `**${prefix}subtract** <first> <second> [third] [fourth]`, value: `Subtract two numbers.`},
			{ name: `**${prefix}multiply** <first> <second> [third] [fourth]`, value: `Multiply two numbers.`},
			{ name: `**${prefix}divide** <first> <second> [third] [fourth]`, value: `Divide two numbers.`},
			{ name: `**${prefix}function** <sin|cos|tan|log|asin|acos|atan|log10|ln|\`etc.\`> <number>`, value: `Get a cosine, sine, tangent, and more!`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 2`)
		.setAuthor(`${message.author.username} | Math (Page 2)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}square** <number>`, value: 'Square a number.'},
			{ name: `**${prefix}cube** <number>`, value: 'Cube a number.'},
			{ name: `**${prefix}sqrt** <number>`, value: 'Get the square root of a number.'},
			{ name: `**${prefix}cbrt** <number>`, value: 'Get the cube root of a number.'},
			{ name: `**${prefix}pi** <number>`, value: 'Multiply a number times π.'}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 3`)
		.setAuthor(`${message.author.username} | Math (Page 3)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription('\`\`\`css\n[] is optional; <> is required\`\`\`')
		.addFields(
			{ name: `**${prefix}exponent** <number> <first-exponent> [second-exponent] [third-exponent]`, value: 'Create a custom exponent equation.'},
			{ name: `**${prefix}expression** <expression>`, value: `Create your own custom expression and Connor will solve it for you! (For example: \"(12 + 3) * x + 7 ^ 2\") **Variables Not Supported**`},
			{ name: `**${prefix}test** <zero|prime|negative|positive|integer> <expression>`, value: `Test if your expression (evaluated) is zero, prime, negative, positive, or an integer!`},
			{ name: `**${prefix}remainder** <dividend> <divisor>`, value: `Divide a number by another number, and Connor will return a remainder.`},
			{ name: `**${prefix}round <up|down|normal> <expression>**`, value: `Rounds an evaluated expression either up, down, or normally.`},
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation4 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 4`)
		.setAuthor(`${message.author.username} | Math (Page 4)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription('\`\`\`css\n[] is optional; <> is required\`\`\`')
		.addFields(
			{ name: `**${prefix}absolute** <expression>`, value: `Returns the absolute value of an expression.`},
			{ name: `**${prefix}mean** <numbers>`, value: `Find the mean of all the values.`},
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation5 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 5`)
		.setAuthor(`${message.author.username} | ELA / Writing`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}phraseinfo** <message>`, value: `Get the information of a message. Words, Characters, Vowels, Constanents, etc.`},
			{ name: `**${prefix}translate** <to-language> <phrase>`, value: `Translate a phrase to a specified language. Leave no arguments for a list of supported languages.`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpModeration1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Moderation`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}ban** <user> [reason] [duration]`, value: `Ban a specified user, for a specified time.`},
			{ name: `**${prefix}kick** <user> [reason]`, value: `Kick a user.`},
			{ name: `**${prefix}mute** <user> [reason] [duration]`, value: `Prevent a user from talking.`},
			{ name: `**${prefix}nick** <user> <nickname>`, value: `Change a user's nickname.`},
			{ name: `**${prefix}delete** <messageID>`, value: `Delete a message with a specified ID.`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp()
		const helpModeration2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Moderation | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}purge** <amount> [channel]`, value: `Purge a certain amount of messages. Choice of specified channel. (Discord has prevented a purge of messages older than 2 weeks)`},
			{ name: `**${prefix}mutechannel** <channel> [duration]`, value: `Mute a specified channel.`},
			{ name: `**${prefix}unban** <user>`, value: `Unban a specified user.`},
			{ name: `**${prefix}unmute** <user>`, value: `Unmute a user.`},
			{ name: `**${prefix}unmutechannel** <channel>`, value: `Unmute a specified channel.`},
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
			const helpPages = await message.channel.send(helpPage1)
			// Reaction Listener
			helpPages.react('1️⃣').then(() => helpPages.react('2️⃣')).then(() => helpPages.react('3️⃣'));

			const pageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			const pageTurner = helpPages.createReactionCollector(pageFilter, { time: 120000 });
			pageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
			helpPages.edit(helpPage1);
			helpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
		} else if (reaction.emoji.name === '2️⃣') {
			helpPages.edit(helpPage2);
			helpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
		} else if (reaction.emoji.name === '3️⃣') {
			helpPages.edit(helpPage3);
			helpPages.reactions.resolve('3️⃣').users.remove(message.author.id);
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
			// Reaction Filter
		const funPageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		const funPageTurner = funHelpPages.createReactionCollector(funPageFilter, { time: 120000 });
		funPageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
				funHelpPages.edit(helpFun1);
				funHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '2️⃣') {
				funHelpPages.edit(helpFun2);
				funHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '3️⃣') {
					funHelpPages.edit(helpFun3);
					funHelpPages.reactions.resolve('3️⃣').users.remove(message.author.id);
			}
		})
		funPageTurner.on('end', (collected) => {
			funHelpPages.edit(timedOut);
			})
		} else if (args[0] === 'education') {
		const educationHelpPages = await message.channel.send(helpEducation1);
		// Reaction Listener
		educationHelpPages.react('1️⃣').then(() => educationHelpPages.react('2️⃣')).then(() => educationHelpPages.react('3️⃣')).then(() => educationHelpPages.react('4️⃣')).then(() => educationHelpPages.react('5️⃣'));
			// Filter
		const educationPageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
			// Reaction Collection
		const educationPageTurner = educationHelpPages.createReactionCollector(educationPageFilter, { time: 120000 });
		educationPageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
				educationHelpPages.edit(helpEducation1);
				educationHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '2️⃣') {
				educationHelpPages.edit(helpEducation2)
				educationHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '3️⃣') {
				educationHelpPages.edit(helpEducation3)
				educationHelpPages.reactions.resolve('3️⃣').users.remove(message.author.id);
			}	else if (reaction.emoji.name === '4️⃣') {
				educationHelpPages.edit(helpEducation4);
				educationHelpPages.reactions.resolve('4️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '5️⃣') {
				educationHelpPages.edit(helpEducation5);
				educationHelpPages.reactions.resolve('5️⃣').users.remove(message.author.id);
			}
		})
		educationPageTurner.on('end', (collected) => {
			educationHelpPages.edit(timedOut);
		})
	} else if (args[0] === 'moderation') {
		const moderationHelpPages = await message.channel.send(helpModeration1);
		// Reaction Listener
		moderationHelpPages.react('1️⃣').then(() => moderationHelpPages.react('2️⃣'))
		const moderationPageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣'].includes(reaction.emoji.name && user.id === message.author.id)
		}
		// Collector
		const moderationPageTurner = moderationHelpPages.createReactionCollector(moderationPageFilter, { time: 120000})
		moderationPageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
				moderationHelpPages.edit(helpModeration1);
				moderationHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '2️⃣') {
				moderationHelpPages.edit(helpModeration2)
				moderationHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			}
		})
		moderationPageTurner.on('end', (collected) => {
			moderationHelpPages.edit(timedOut);
		})
	}
		} catch (error) {
			message.reply(config.error)
			console.error(error)
		}
	}
}
