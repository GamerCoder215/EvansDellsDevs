module.exports = async (client, message) => {
	// Discord & Dependencies
	const Discord = require('discord.js');
	const db = require('quick.db'); // Databased used for custom prefix
	const config = require('./evt_config.json');
	if (message.guild === null) {
		var guildID = '761571644384346143'
	} else {
		var guildID = message.guild.id;
	}
	// Detects if user is muted
	if (db.get(`guild_${message.guild.id}_${message.author.id}_muted`) === true) {
		message.delete();
		message.author.send(`You are muted. Please stop trying to talk.`);
	}
	// Detects if it is in a DM
	var prefix = db.get(`guild_${guildID}_prefix`) || '?'
	// Get the prefix (If none, use question mark)
  const args = message.content.slice(prefix.length).trim().split(/ +/);
	// Arguments
  const cmdName = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
	// Get the command

  const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if (!command) return; // If there is no command, return
	// Detects if command is in a DM
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
	// Set Null to False
	if (`modules_education_${message.author.id}_purchased` === null) {
		db.set(`modules_education_${message.author.id}_purchased`, false)
	}
	if (`dms_purchases_${message.author.id}_education` === null) {
		db.set(`dms_purchases_${message.author.id}_education`, false)
	}
	// Detects if you have the Education role
	if (message.member.roles.cache.has('766313565816487976')) {
		db.set(`modules_education_${message.author.id}_purchased`, true)
	}
	// Detetcs if the Education Module isn't bought
	if (command.education && db.get(`modules_education_${message.author.id}_purchased`) === false) {
		const educationPremium = new Discord.MessageEmbed()
		.setTitle('Paid Feature')
		.setDescription(`This is a paid feature that comes with the \`Education\` Module. If you want to purchase the Education Module, follow these steps:\n\n1.) Join the Support Server: https://discord.gg/upx6SqG\n2.) Buy the Education Module Here: https://patreon.com/gamercoder215\n3.) After purchase, please wait a short while. You will then have access to the education module when I DM you!\n**Note: Premiums are PER USER.**__ If you are a teacher / president of a group, apply for group work —> https://www.surveymonkey.com/r/9728TSK`)
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		return message.channel.send(educationPremium);
	}
	// Detects if you haven't been DMed with a code and you haven't
	if (message.member.roles.cache.has('766313565816487976') && db.get(`dms_purchases_${message.author.id}_education`) === false) {
		const thanksEmbed = new Discord.MessageEmbed()
		.setTitle('Thanks for Purchasing the Education Module!')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Thanks for Purchasing my Education Module!\nWe appreciate your support and believing in Connor for all the work he has done!\n\nHappy Learning!`)
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.author.send(`<@${message.author.id}>`, thanksEmbed);
		db.set(`dms_purchases_${message.author.id}_education`, true)
	}
	// Detects if the user doesn't have the role (Removed by Patreon Bot) and is added to the Set of people who have Education
	if (!message.member.roles.cache.has('766313565816487976') && db.get(`dms_purchases_${message.author.id}_education`) === true) {
		db.set(`modules_education_${message.author.id}_purchased`, false)
		db.set(`dms_purchases_${message.author.id}_education`. false)
		const removeEmbed = new Discord.MessageEmbed()
		.setTitle('Sorry')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Unfortunately, you stopped paying for Education. We have to remove you from the set, but hey, maybe you'll go back!\nLet us know what we did wrong by Joining our Support Server —> https://discord.gg/upx6SqG`)
		.setColor(config.red)
		.setFooter('*Sad Connor Noises*')
		.setTimestamp();
		message.author.send(`<@${message.author.id}>`, removeEmbed)
	}

	try {
		if (command) command.run(client, message, args);
		// If there is a command, run it
	// If there is any errors, catch it and log it in the console
	} catch (error) {
		console.error(error);
		message.reply(config.error);
	}
}
