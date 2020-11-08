module.exports = {
	name: 'post',
	description: 'Posts a global event, sometimes as a webhook.',
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config + Dependencies
		const Discord = require('discord.js');
		const config = require('./cmd_config.json');
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		const guild = client.guilds.cache.get(config.serverID)
		// Invalid Perms Role
		const invalidPerms = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have permission to use this command.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		if (!message.member.hasPermission('MANAGE_SERVER') && !message.members.roles.has(config.permrole)) {
			return message.channel.send(invalidPerms);
		}
			if (args[0] === 'verify') {
		} else if (args[0] === 'rules') {
			message.delete()
			const rulesEmbed = new Discord.MessageEmbed()
			.setTitle('Connor Corner Rules')
			.setDescription(`1.) 🥰 **Stay Kind**.\nOur #1 rule in this server is to stay kind. This is a support server after all (Well, maybe not entirely), but still, just treat people how you want to be treated.\n\n2.) ↔️ **Be Specific**\nWhen asking a question or needing help, please be specific on what happened. What steps did you take to get to this? What module were you using? What arguments did you use?\n\n3.) <:angryping:764403014021808166> **Keep your name mentionable**\nIn case you\'re in need of support, make sure your name is mentionable. Names like \'œ®†¥\' and \'πøœ∑\' can't be easily mentioned. If you don\'t want to change your name, make a nickname instead.\n\n4.)🔞 **No NSFW Allowed**\nPlease, no NSFW content or images are permitted in this server. We take this rule very seriously, and anyone caught breaking it will be banned on the spot. We do __not__ tolerate this well and there is really no reason why you should be doing this.\n\n5.)❓ **Ask questions and have fun.**\nIf you\'ve passed all of the other rules, then please just be a human and ask questions. Nothing wrong with asking about a rule in <#764405930661117982> or just trying to level up in <#761572015236186143>. All we ask in return is to just use the bot and have fun.`)
			.setColor(config.pink)
			.setTimestamp();
			// Webhook
			const rulesWebhook = new Discord.WebhookClient('764407211815469076', 'pA35ZXMKwbDCQyA9Y9w4HKpLpZWaGGZSvxJnyZ6aVsfa-JCziQPxOVEn4VxYlfkkZks5')
			rulesWebhook.send(rulesEmbed);
		} else if (args[0] === 'staff-applications') {
			message.delete();
			const staffApplicationEmbed = new Discord.MessageEmbed()
			.setDescription(`__Apply for Staff__\n\n*Keep in mind you must be at least 14 years old and have an account of at least 6 months of age for each requirement.*\n\nPlease complete at least 4 of the requirements for each one.\n\n\n__Trial Admin / Trial Support Team__\n— Verified Email Address\n— Moderating / Support Experience\n— Kind & Patient\n— Decent knowledge of Connor / Cammie and its functions\n— Verified Phone\n— At least 1 connection\n— Member for at least \`2 weeks\`\n\n__Admin / Support Team__\n— Trial Admin / Support Role for \`3 weeks\`\n— Moderation Experience\n— Able to handle NSFW Content (If you see any)\n— Solid konwledge of Connor / Cammie and its functions\n— Member for at least\`2 months\`\n— Verified Email Address\n— Verified Phone\n— Kind & Patient\n\n__Server Managers__\n— Trial Admin / Trial Support Team for \`3 months\`\n— Admin / Support Team role for \`1 month\`\n— Verified Email Address\n— Verified Phone\n— At least 2 connections\n— Solid knowledge of Connor / Cammie and its functions.\n\n__Developer__\n— Server Managers Role for at least \`2 weeks\` (Required)\n— At least 1.5 years experience in JavaScript, Node.JS, and Discord API. (Required)\n— Repl.it account\n— Github Account & Connection (Required)\n— Knowledge of all Connor and Cammie functions.\n\nWhen you finish, complete this survey: https://www.surveymonkey.com/r/L2BJMLP`)
			.setColor(config.gold)
			.setFooter('*Whoo, that\'s long!*')
			.setTimestamp();
			const staffApplicationWebhook = new Discord.WebhookClient('764410559000477717', 'NFkvHFvF8CiRapRPMtjdOzahVX1OEQMRilpO6ZckcWCCYbN44b5EhTDO7UlABZ9nKWJd')
			staffApplicationWebhook.send(staffApplicationEmbed);
		} else if (args[0] === 'advertisement') {
			message.delete();
			const advertisementEmbed = new Discord.MessageEmbed()
			.setDescription(`**Connor\'s Chill Corner**\nServer with **${guild.memberCount}** members\n<:connor:764898652882993184> Support Server for ConnorBot\n🗣️ | Chill talkative server with its own built-in leveling system\n🎥 | Stream your own games with customized bitrates!\n🥇 | Compete for the highest message count!\n\n**JOIN NOW!**`)
			.setColor(config.gold)
			.setTimestamp();
			message.channel.send(advertisementEmbed);
		} else {
			return message.channel.send(invalidArgs);
		}
	}
}