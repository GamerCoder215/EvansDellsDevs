module.exports = {
	name: 'help',
	description: 'Give a help message.',
	aliases: ['h'],
	async run(client, message, args) {
		// Discord, Prefix + Config
		const Discord = require('discord.js');
		const db = require('quick.db');
		var prefix = db.get(`guild_${message.guild.id}_prefix`) || '?';
		const config = require('../command_config.json');
		// Timed Out Embed
		const timedOut = new Discord.MessageEmbed()
		.setTitle('❌ Error')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription('Your message has timed out!')
		.setColor('#ff0000')
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Beta Message Embed
		const betaEmbed = new Discord.MessageEmbed()
		.setDescription(`This command is currently in beta, and is not released to the public yet. Join the [support server](https://discord.gg/upx6SqG) for updates on Connor.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Help Embeds
		const helpPage1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Free Modules`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\`\nIf you need additional help, refer to the [documentation](https://docs.connorbot.cf).`)
		.addFields(
			{ name: '📓General', value: `\`${prefix}help general\``, inline: true },
			{ name: '\u200b', value: '\u200b' },
			{ name: '🎉Fun', value: `\`${prefix}help fun\``, inline: true },
			{ name: '\u200b', value: '\u200b' },
			{ name: '⚙️Settings', value: `\`${prefix}help settings\``, inline: true },
		)
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpPage2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Page 2 | Free Modules (Page 2)`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\`\nIf you need additional help, refer to the [documentation](https://docs.connorbot.cf).`)
		.addFields(
			{ name: '🔧Moderation', value: `\`${prefix}help moderation\``, inline: true },
			{ name: '\u200b', value: '\u200b' },
			{ name: '🏠 Server Moderation (Coming Soon)', value: `\`${prefix}help servermod\``, inline: true },
			{ name: '\u200b', value: '\u200b' },
			{ name: '📦 Logging', value: `\`${prefix}help logging\``, inline: true },
		)
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpPage3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Page 3 | Paid Modules`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\`\nIf you need additional help, refer to the [documentation](https://docs.connorbot.cf).`)
		.addFields(
			{ name: '🧑‍🏫 Education', value: `\`${prefix}help education\``, inline: true },
			{ name: '\u200b', value: '\u200b' },
			{ name: '<:database:766527107651338250> Database', value: `\`${prefix}help database\`` },
			{ name: '\u200b', value: '\u200b' },
			{ name: '🛠️ Advanced Tools (Coming Soon)', value: `\`${prefix}help advtools\`` },
		)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Sub Help Embeds
		const helpGeneral = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | General`)
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}links**`, value: 'Get some useful links for the bot.' },
			{ name: `**${prefix}help**`, value: 'View the help message.' },
			{ name: `**${prefix}ping**`, value: 'Ping me with an exact runtime.' },
			{ name: `**${prefix}cmdinfo** <command>`, value: 'Get information about a command. Commands must be referred as their **original name**.' },
			{ name: `**${prefix}apply**`, value: 'Learn about earning or gaining Free Premium.'}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpFun1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}pokemon**`, value: `Find out your dream pokemon.` },
			{ name: `**${prefix}turn** <message>`, value: `sıɥʇ ǝʞıl ʞool ǝɓɐssǝɯ ɐ ǝʞɐW` },
			{ name: `**${prefix}binary** <message>`, value: `Turns a message into binary code!` },
			{ name: `**${prefix}shout** <message>`, value: `**__📣 MAKE A MESSAGE LOOK LIKE THIS📣__**` },
			{ name: `**${prefix}distract** [diversion]`, value: `Distract the channel (or create a diversion.)` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpFun2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}number** <min-value> <max-value>`, value: `Generate a number from a specified area.` },
			{ name: `**${prefix}8ball**`, value: `Generate a random answer from 8 possibilities.` },
			{ name: `**${prefix}ingrammar** <message>`, value: `Remove all of the vowels and y's in a message. \"Lke ths r tht.\"` },
			{ name: `**${prefix}color**`, value: `Generate a random color from the basic rainbow.` },
			{ name: `**${prefix}mlg** [user-mention|user-id]`, value: `Get a MLG user avatar. If nothing, you'll get your own.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpFun3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Fun | Page 3`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}game**`, value: `Find your ideal video game.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpEducation1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education`)
		.setAuthor(`${message.author.username} | Math`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}add** <first> <second> [third] [fourth]`, value: `Add two numbers.` },
			{ name: `**${prefix}subtract** <first> <second> [third] [fourth]`, value: `Subtract two numbers.` },
			{ name: `**${prefix}multiply** <first> <second> [third] [fourth]`, value: `Multiply two numbers.` },
			{ name: `**${prefix}divide** <first> <second> [third] [fourth]`, value: `Divide two numbers.` },
			{ name: `**${prefix}function** <sin|cos|tan|log|asin|acos|atan|log10|ln|\`etc.\`> <number>`, value: `Get a cosine, sine, tangent, and more!` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 2`)
		.setAuthor(`${message.author.username} | Math (Page 2)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}square** <number>`, value: 'Square a number.' },
			{ name: `**${prefix}cube** <number>`, value: 'Cube a number.' },
			{ name: `**${prefix}sqrt** <number>`, value: 'Get the square root of a number.' },
			{ name: `**${prefix}cbrt** <number>`, value: 'Get the cube root of a number.' },
			{ name: `**${prefix}pi** <number>`, value: 'Multiply a number times π.' },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 3`)
		.setAuthor(`${message.author.username} | Math (Page 3)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription('\`\`\`css\n[] is optional; <> is required\`\`\`')
		.addFields(
			{ name: `**${prefix}exponent** <number> <first-exponent> [second-exponent] [third-exponent]`, value: 'Create a custom exponent equation.' },
			{ name: `**${prefix}expression** <expression>`, value: `Create your own custom expression and Connor will solve it for you! (For example: \"(12 + 3) * x + 7 ^ 2\") **Variables Not Supported**` },
			{ name: `**${prefix}test** <zero|prime|negative|positive|integer> <expression>`, value: `Test if your expression (evaluated) is zero, prime, negative, positive, or an integer!` },
			{ name: `**${prefix}remainder** <dividend> <divisor>`, value: `Divide a number by another number, and Connor will return a remainder.` },
			{ name: `**${prefix}round <up|down|normal> <expression>**`, value: `Rounds an evaluated expression either up, down, or normally.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation4 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 4`)
		.setAuthor(`${message.author.username} | Math (Page 4)`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription('\`\`\`css\n[] is optional; <> is required\`\`\`')
		.addFields(
			{ name: `**${prefix}absolute** <expression>`, value: `Returns the absolute value of an expression.` },
			{ name: `**${prefix}mean** <numbers>`, value: `Find the mean of all the values.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpEducation5 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Education | Page 5`)
		.setAuthor(`${message.author.username} | ELA / Writing`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}phraseinfo** <message>`, value: `Get the information of a message. Words, Characters, Vowels, Constanents, etc.` },
			{ name: `**${prefix}translate** <to-language> <phrase>`, value: `Translate a phrase to a specified language. Leave no arguments for a list of supported languages.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpModeration1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Moderation`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}ban** <user> <reason>`, value: `Ban a specified user, for a specified time.` },
			{ name: `**${prefix}kick** <user> <reason>`, value: `Kick a user.` },
			{ name: `**${prefix}mute** <user> <reason>`, value: `Prevent a user from talking, in both a text channel and voice channel.` },
			{ name: `**${prefix}nick** <self|user> <nickname> [reason]`, value: `Change yourself or a user's nickname. Optional reason.` },
			{ name: `**${prefix}purge** <amount> [channel]`, value: `Purge a certain amount of messages. Choice of specified channel. (Discord has prevented a purge of messages older than 2 weeks)` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpModeration2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Moderation | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}mutechannel** <channel> [duration]`, value: `Mute a specified channel. No roles required.` },
			{ name: `**${prefix}unban** <user>`, value: `Unban a specified user.` },
			{ name: `**${prefix}unmute** <user>`, value: `Unmute a user.` },
			{ name: `**${prefix}unmutechannel** <channel> [reason]`, value: `Unmute a specified channel. No roles required. Optional reason.` },
			{ name: `**${prefix}tempban** <user> <duration> <reason>`, value: `Temporarily ban a user. Duration must be in **hours** (0.5 for 30 minutes, 0.25 for 15 minutes, etc.)` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpModeration3 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\ | Moderation | Page 3`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.setDescription(`\`\`\`css\n[] is optional; <> is required\`\`\``)
		.addFields(
			{ name: `**${prefix}tempmute** <user> <duration> <reason>`, value: `Temporarily mute a user. Duration must be in **minutes** (60 for hour, 30 for half an hour, etc.)` },
			{ name: `**${prefix}deafen** <user> <reason>`, value: `Server Deafen a user in a voice channel.` },
			{ name: `**${prefix}undeafen** <user>`, value: `Server Undeafen a user in a voice channel.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpLogging = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Logging`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}setchannel** <channel> <all|event>`, value: `Set the channel where you want events to show up. Option of separating certain events. If you want all events, use all. Click [here](https://docs.connorbot.cf/module-information/event-names) for event names.` },
			{ name: `**${prefix}enable** <all|event>`, value: `Enables an event for sending. **You must set a channel for the event(s) first**. Option of enabling a certain event or all.` },
			{ name: `**${prefix}disable** <all|event>`, value: `Disables an event for sending. All events, by default, are automatically disabled.` },
			{ name: `**${prefix}messagetype** <normal|embed>`, value: `Allows you to pick if you want logging done normally or in embeds. Default: Normal.` },
			{ name: `**${prefix}detailtype** <1|2|3|4>`, value: `Sets how detailed you want the logs.\n1 — Minimal Logging\n2 — Basic Logging\n3 — Somewhat Detailed Logging (Recommended)\n4 — Maximum Logging` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpDatabase1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Database`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}new** <value>`, value: `Store a message or keyword in a database. Will return an ID. (Just in case, Connor will delete the message automatically for secrecy.)` },
			{ name: `**${prefix}get** <value>`, value: `Get the keyword stored from an ID.` },
			{ name: `**${prefix}protect** <value> <permission>`, value: `Protect a certain value with a permission. If you need a list of permissions, go [here](https://https://docs.connorbot.cf/module-information/database-permissions).` },
			{ name: `**${prefix}2FA** <code> <user|channel>`, value: `Protects a stored item with 2FA. Click [here](https://docs.connorbot.cf/) to learn more about 2FA. **Must have password enabled.**` },
			{ name: `**${prefix}password** <code> <password>`, value: `Protect a stored item with a password. Click [here](https://docs.connorbot.cf/) to learn more about password protection.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const helpDatabase2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Database | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}rename** <id> <value>`, value: `Renames the value associated with the ID in the database.` },
			{ name: `**${prefix}delete** <id>`, value: `Deletes a value in the database.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpServerModeration1 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Server Moderation`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}setname** <name>`, value: `Set the server's name.`},
			{ name: `**${prefix}setafk** <channelID> [timeout]`, value: `Set the AFK channel. As voice channels cannot be mentioned, you must provide an ID. Option of setting the timeout as well.`},
			{ name: `**${prefix}setsystem** <channel>`, value: `Sets the system messages channel.`},
			{ name: `**${prefix}setdefaultnotify** <all|mentions>`, value: `Sets the default server notifications to either __All Messages__ or __Only Mentions__.`},
			{ name: `**${prefix}setregion** <region>`, value: `Sets the region. See the [documentation](https://docs.connorbot.cf/modules/server-moderation) for more information.`}
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpServerModeration2 = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Server Moderation | Page 2`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}setmodlevel** <1|2|3|4|5>`, value: `Sets the moderation level (1 = none, 2 = low, 3 = medium, 4 = high, 5 = highest)`},
			{ name: `**${prefix}setmedia** <1|2|3>`, value: `Set the level of scanning you want to have on messages (1 = None, 2 = No Roles, 3 = All)`},
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();

		const helpSettings = new Discord.MessageEmbed()
		.setTitle(`Help for \`${message.author.username}\` | Settings`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
		.addFields(
			{ name: `**${prefix}prefix** <prefix>`, value: `Set the bot's prefix.` },
		)
		.setColor(config.blue)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!args[0]) {
			const helpPages = await message.channel.send(helpPage1);
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
		});
	pageTurner.on('end', (collected) => {
		helpPages.edit(timedOut);
		helpPages.reactions.removeAll();
		});
	} else if (args[0] === 'general') {
		return message.channel.send(helpGeneral);
	} else if (args[0] === 'fun') {
		const funHelpPages = await message.channel.send(helpFun1);
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
		});
		funPageTurner.on('end', (collected) => {
			funHelpPages.edit(timedOut);
			funHelpPages.reactions.removeAll();
			});
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
				educationHelpPages.edit(helpEducation2);
				educationHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '3️⃣') {
				educationHelpPages.edit(helpEducation3);
				educationHelpPages.reactions.resolve('3️⃣').users.remove(message.author.id);
			}	else if (reaction.emoji.name === '4️⃣') {
				educationHelpPages.edit(helpEducation4);
				educationHelpPages.reactions.resolve('4️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '5️⃣') {
				educationHelpPages.edit(helpEducation5);
				educationHelpPages.reactions.resolve('5️⃣').users.remove(message.author.id);
			}
		});
		educationPageTurner.on('end', (collected) => {
			educationHelpPages.edit(timedOut);
			educationHelpPages.reactions.removeAll();
		});
	} else if (args[0] === 'moderation') {
		const moderationHelpPages = await message.channel.send(helpModeration1);
		// Reaction Listener
		moderationHelpPages.react('1️⃣').then(() => moderationHelpPages.react('2️⃣')).then(() => moderationHelpPages.react('3️⃣'));
		const moderationPageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
		// Collector
		const moderationPageTurner = moderationHelpPages.createReactionCollector(moderationPageFilter, { time: 120000 });
		moderationPageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
				moderationHelpPages.edit(helpModeration1);
				moderationHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '2️⃣') {
				moderationHelpPages.edit(helpModeration2);
				moderationHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '3️⃣') {
				moderationHelpPages.edit(helpModeration3);
				moderationHelpPages.reactions.resolve('3️⃣').users.remove(message.author.id);
			}
		});
		moderationPageTurner.on('end', (collected) => {
			moderationHelpPages.edit(timedOut);
			moderationHelpPages.reactions.removeAll();
		});
	} else if (args[0] === 'logging') {
		message.channel.send(helpLogging);
	} else if (args[0] === 'database') {
		const databaseHelpPages = await message.channel.send(helpDatabase1);
		databaseHelpPages.react('1️⃣').then(() => databaseHelpPages.react('2️⃣'));
		// Filter
		const databasePageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
		const databasePageTurner = databaseHelpPages.createReactionCollector(databasePageFilter, { time: 120000 });
		databasePageTurner.on('collect', (reaction, user) => {
		if (reaction.emoji.name === '1️⃣') {
			databaseHelpPages.edit(helpDatabase1);
			databaseHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
		} else if (reaction.emoji.name === '2️⃣') {
			databaseHelpPages.edit(helpDatabase2);
			databaseHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
		}
		});
		databasePageTurner.on('end', (collected) => {
			databaseHelpPages.edit(timedOut);
			databaseHelpPages.reactions.removeAll();
		});
	} else if (args[0] === 'settings') {
		message.channel.send(helpSettings);
	} else if (args[0] === 'servermod') {
		const servermodHelpPages = await message.channel.send(helpServerModeration1);
		servermodHelpPages.react('1️⃣').then(() => servermodHelpPages.react('2️⃣'));
		const servermodPageFilter = (reaction, user) => {
			return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
		};
		const servermodPageTurner = servermodHelpPages.createReactionCollector(servermodPageFilter, { time: 120000 });
		servermodPageTurner.on('collect', (reaction, user) => {
			if (reaction.emoji.name === '1️⃣') {
				servermodHelpPages.edit(helpServerModeration1);
				servermodHelpPages.reactions.resolve('1️⃣').users.remove(message.author.id);
			} else if (reaction.emoji.name === '2️⃣') {
				servermodHelpPages.edit(helpServerModeration2);
				servermodHelpPages.reactions.resolve('2️⃣').users.remove(message.author.id);
			}
		})
		servermodPageTurner.on('end', (collected) => {
			servermodHelpPages.edit(timedOut);
			servermodHelpPages.reactions.removeAll();
		})
	} else return;
	} catch (error) {
		message.reply(config.error);
		console.error(error);
		}
	},
};