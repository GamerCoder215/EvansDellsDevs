module.exports = {
  name: 'get',
  description: 'Gets a value from the database.',
  database: true,
  aliases: ['retrieve', 'dbget'],
  async run(client, message, args) {
    // Discord, Config & NPM Dependencies
    const Discord = require('discord.js');
    const config = require('../command_config.json');
    const db = require('quick.db');
		const codeGenerator = require('generate-password');
    // Tables
      // Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`,
		];
    // Embeds
    // Invalid Args Embed
    const invalidArguments = new Discord.MessageEmbed()
    .setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Data Not Found
    const dataNotFound = new Discord.MessageEmbed()
    .setDescription(`Sorry ${message.author.username}, there is no data associated with this code.`)
    .setColor(config.red)
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Not Whitelisted
		const invalidAccess = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have access to this data.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Data
		var keywords = db.get(`value_${args[0]}`);
		const dataEmbed = new Discord.MessageEmbed()
    .setTitle(`Code \`${args[0]}\``)
    .setDescription(`The value give is: "${keywords}"`)
		.setColor(config.gold)
    .setFooter(config.name, config.icon)
    .setTimestamp();
		// Functions
		// Test for Protection Function
		function checkProtection(code) {
      if (keywords === undefined) return message.channel.send(dataNotFound);
				if (db.get(`protection_${code}`) === null) {
				message.channel.send(dataEmbed);
			} else {
				// Replace Connor Permission with Discord.JS Permission
				if (db.get(`protection_${code}`) === 'admin') {
					var permission = 'ADMINISTRATOR';
				} else if (db.get(`protection_${code}`) === 'mng-server') {
					var permission = 'MANAGE_GUILD';
				} else if (db.get(`protection_${code}`) === 'mng-roles') {
					var permission = 'MANAGE_ROLES';
				} else if (db.get(`protection_${code}`) === 'mng-channels') {
					var permission = 'MANAGE_CHANNELS';
				} else if (db.get(`protection_${code}`) === 'mng-msg') {
					var permission = 'MANAGE_MESSAGES';
				} else if (db.get(`protection_${code}`) === 'mng-emoji') {
					var permission = 'MANAGE_EMOJIS';
				} else if (db.get(`protection_${code}`) === 'mng-webh') {
					var permission = 'MANAGE_WEBHOOKS';
				} else if (db.get(`protection_${code}`) === 'mention') {
					var permission = 'MENTION_EVERYONE';
				} else if (db.get(`protection_${code}`) === 'external') {
					var permission = 'USE_EXTERNAL_EMOJIS';
				} else if (db.get(`protection_${code}`) === 'ban') {
					var permission = 'BAN_MEMBERS';
				} else if (db.get(`protection_${code}`) === 'kick') {
					var permission = 'KICK_MEMBERS';
				} else if (db.get(`protection_${code}`) === 'mute') {
					var permission = 'MUTE_MEMBERS';
				} else if (db.get(`protection_${code}`) === 'deafen') {
					var permission = 'DEAFEN_MEMBERS';
				} else if (db.get(`protection_${code}`) === 'move') {
					var permission = 'MOVE_MEMBERS';
				} else if (db.get(`protection_${code}`) === 'priority') {
					var permission = 'PRIORITY_SPEAKER';
				} else if (db.get(`protection_${code}`) === 'msg-tts') {
					var permission = 'SEND_TTS_MESSAGES';
				}
				var responsePermission = permission.replace(/[_]/g, ' ').toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
				// Invalid Discord Permissions
				const invalidDiscordPermissions = new Discord.MessageEmbed()
				.setDescription(`Sorry ${message.author.username}, but the owner requires users to have the \`${responsePermission}\` permission!`)
				.setColor(config.red)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				if (!message.member.hasPermission(permission)) {
					return message.channel.send(invalidDiscordPermissions);
				} else {
					message.channel.send(dataEmbed);
				}
			}
		}
    // Command Sequence
    try {
    if (!args[0]) {
      return message.channel.send(invalidArguments);
      } else if (db.get(`password_${args[0]}`)) {
				var correctPassword = db.get(`password_${args[0]}`);
				const passwordEmbed = new Discord.MessageEmbed()
				.setDescription('Enter your password:')
				.setColor(config.gold);
				message.channel.send(passwordEmbed);
				const passwordFilter = m => isNaN(m.content) && m.author.id === message.author.id && !m.author.bot;
				const awaitingPassword = message.channel.createMessageCollector(passwordFilter, { max: 1 });
				awaitingPassword.on('end', async (collected) => {
				var enteredPassword = collected.first();
				// Invalid Input
				const invalidInput = new Discord.MessageEmbed()
				.setDescription('You have entered an invalid input! Please run the command again.')
				.setColor(config.red)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				// Correct Password
				const enteredCorrectPassword = new Discord.MessageEmbed()
				.setDescription('You have entered a correct password! Checking for 2FA / protection...')
				.setColor(config.gold)
				.setFooter(config.name, config.icon)
				.setTimestamp();
				if (enteredPassword.content === correctPassword) {
					message.channel.send(enteredCorrectPassword);
					setTimeout(() => {
					if (db.get(`password_${args[0]}_2`)) {
						var twoFAChoice = db.get(`password_${args[0]}_2`);
						const twoFASent = new Discord.MessageEmbed()
						.setDescription('A 6-digit code was sent to the set user / channel. Enter the code in this channel:')
						.setColor(config.gold);
						const correctCodeEmbed = new Discord.MessageEmbed()
						.setDescription('You have entered the correct code! Checking for protection...')
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						const twoFAFilter = async m => !isNaN(m.content) && !m.author.bot;
						if (twoFAChoice.startsWith('U')) {
						var setUser = client.users.cache.get(twoFAChoice.replace(/[U]/g, ''));
						var code = codeGenerator.generate({
							length: 6,
							uppercase: false,
							lowercase: false,
							numbers: true,
							symbols: false,
						});
						const codeEmbed = new Discord.MessageEmbed()
						.setDescription(`Your code is \`${code}\``)
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						setUser.send(codeEmbed);
						db.set(`password_${args[0]}_2_code`, code);
						message.channel.send(twoFASent);
						const awaitCode = message.channel.createMessageCollector(twoFAFilter, { max: 1 });
						awaitCode.on('end', (collected) => {
							var enteredCode = collected.first();
							var correctCode = db.get(`password_${args[0]}_2_code`);
							if (enteredCode.content === correctCode) {
								message.channel.send(correctCodeEmbed);
								setTimeout(() => {
									checkProtection();
								}, 500);
							} else {return message.channel.send(invalidInput);}
						});
					} else if (twoFAChoice.startsWith('C')) {
						var setChannel = client.channels.cache.get(twoFAChoice.replace(/[C]/g, ''));
						var code = codeGenerator.generate({
							length: 6,
							uppercase: false,
							lowercase: false,
							numbers: true,
							symbols: false,
						});
						const codeEmbed = new Discord.MessageEmbed()
						.setDescription(`Your code is \`${code}\``)
						.setColor(config.gold)
						.setFooter(config.name, config.icon)
						.setTimestamp();
						setChannel.send(codeEmbed);
						db.set(`password_${args[0]}_2_code`, code);
						const awaitCode = message.channel.createMessageCollector(twoFAFilter, { max: 1 });
						awaitCode.on('end', (collected) => {
							var enteredCode = collected.first();
							var correctCode = db.get(`password_${args[0]}_2_code`);
							if (enteredCode.content === correctCode) {
                enteredCode.delete({ reason: 'Secrecy of Password' });
								message.channel.send(correctCodeEmbed);
								checkProtection();
							} else {
								return message.channel.send(invalidInput)}
						});
						message.channel.send(twoFASent);
					}
					} else if (db.get(`whitelist_${args[0]}`)) {
						if (db.has(`whitelist_${args[0]}.users`, message.author.id)) {
							const whitelistSuessfulEmbed = new Discord.MessageEmbed()
							.setDescription('You are whitelisted! Checking for protection...')
							.setColor(config.gold)
							.setFooter(config.name, config.icon)
							.setTimestamp();
							checkProtection();
						} else {
							return message.channel.send(invalidAccess);
						}
					} else {
					checkProtection();
					}
					}, 500);
				} else {
	 				message.channel.send(invalidInput);
				}
				});
			} else if (db.get(`whitelist_${args[0]}`)) {
				if (db.has(`whitelist_${args[0]}.whitelist.${message.author.id}`)) {
					if (db.get(`protection_${args[0]}`) === null) {
						message.channel.send(dataEmbed);
					} else {
						checkProtection();
					}
				} else {
					message.channel.send(invalidAccess);
				}
			} else { 
				message.channel.send(dataEmbed);
			}
    } catch (error) {
      console.error(error);
      message.reply(config.error);
    }
  },
};
