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
			// Embed
			const reactionRolesEmbed = new Discord.MessageEmbed()
			.setTitle('React to Become Verified')
			.setAuthor(config.name, config.icon)
			.setDescription('React below to become verified and be admitted into the server! Remember, once you verify you will not be able to become unverified and you will not have permissions to this channel.')
			.setFooter(config.name, config.icon)
			.setColor(config.pink)
			.setTimestamp();
			// Reaction Listener
			const reactRolesMessage = await message.channel.send(reactionRolesEmbed);
			reactRolesMessage.react('🔓')
			const reactFilter = (reaction, user) => {
				return ['🔓'].includes(reaction.emoji.name)
			};
			const verificationMessage = reactRolesMessage.createReactionCollector(reactFilter);
			verificationMessage.on('collect', (reaction, user) => {
				if (reaction.emoji.name === '🔓') {
				unverifiedUser = guild.member(user);
				unverifiedUser.roles.remove('762721218109112380');
				unverifiedUser.roles.add('762721135883583508');
				console.log(`${user.username} was admitted into the server.`)
				}
			})
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
		} else if (args[0] === 'selfroles') {
			message.delete()
			// Pings
			const selfRolesPingsEmbed = new Discord.MessageEmbed()
			.setTitle(`Self Roles | Pings`)
			.setDescription('📣 | React to get pinged when an announcement happens.\n🗞️ | React to get pinged when small or minor updates come out.')
			.setColor(config.pink)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			const selfRolesPings = await message.channel.send(selfRolesPingsEmbed);
			selfRolesPings.react('📣').then(() => selfRolesPings.react('🗞️'))
			const selfRolesPingsFilter = (reaction, user) => {
				return ['📣', '🗞️'].includes(reaction.emoji.name)
			};
			const selfRolesPingsCollection = selfRolesPings.createReactionCollector(selfRolesPingsFilter, { dispose: true })
			selfRolesPingsCollection.on('collect', (reaction, user) => {
				const userMember = guild.member(user);
				if (reaction.emoji.name === '📣') {
				userMember.roles.add('762728355178348594')
				console.log(`${user.username} subscribed to the announce pings.`)
				} else if (reaction.emoji.name === '🗞️') {
				userMember.roles.add('762728079470100500')
				console.log(`${user.username} subscribed to development pings.`)
				}
			})
			selfRolesPingsCollection.on('remove', (reaction, user) => {
				const userMember = guild.member(user);
				if (reaction.emoji.name === '📣') {
				userMember.roles.remove('762728355178348594')
				console.log(`${user.username} unsubscribed to the announce pings.`)
				} else if (reaction.emoji.name === '🗞️') {
				userMember.roles.remove('762728079470100500')
				console.log(`${user.username} unsubscribed to the development pings.`)
				}
			})
			// Categorization
			const selfRolesCategorizationEmbed = new Discord.MessageEmbed()
			.setTitle('Self Roles | Categorization & Access')
			.setDescription('<:github:764660513786429500> | React to get access to the logs of Github.\n🗒️ | React to get access to the server logs.\n<:connor:764898652882993184> | React if you use Connor.\n💚 | React if you support shipping of Connor and I.')
			.setColor(config.pink)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			const selfRolesCategory = await message.channel.send(selfRolesCategorizationEmbed);
			selfRolesCategory.react('764660513786429500').then(() => selfRolesCategory.react('🗒️')).then(() => selfRolesCategory.react('764898652882993184')).then(() => selfRolesCategory.react('💚'))
			const selfRolesCategoryFilter = (reaction, user) => {
				return ['764660513786429500', '🗒️', '764898652882993184', '💚'].some(emoji => reaction.emoji.name === emoji || reaction.emoji.id === emoji)
			};
			const selfRolesCategoryCollection = selfRolesCategory.createReactionCollector(selfRolesCategoryFilter, { dispose: true })
			selfRolesCategoryCollection.on('collect', (reaction, user) => {
				const userMember = guild.member(user);
				if (reaction.emoji.id === '764660513786429500') {
					userMember.roles.add('764659360420069396');
					console.log(`${user.username} was granted access to the #github channel.`)
				} else if (reaction.emoji.name === '🗒️') {
					userMember.roles.add('764659048959180820')
					console.log(`${user.username} was granted access to the logs.`)
				} else if (reaction.emoji.id === '764898652882993184') {
					userMember.roles.add('762728141579485205')
					console.log(`${user.username} uses Connor!`)
				} else if (reaction.emoji.name === '💚') {
					userMember.roles.add('762728219774025788')
					console.log(`${user.username} supports Connie!`)
				}
			});
			selfRolesCategoryCollection.on('remove', (reaction, user) => {
				const userMember = guild.member(user);
				if (reaction.emoji.id === '764660513786429500') {
					userMember.roles.remove('764659360420069396');
					console.log(`${user.username} had his access revoked to the #github channel.`)
				} else if (reaction.emoji.name === '🗒️') {
					userMember.roles.remove('764659048959180820')
					console.log(`${user.username} was revoked access to the logs.`)
				} else if (reaction.emoji.id === '764898652882993184') {
					userMember.roles.remove('762728141579485205')
					console.log(`${user.username} does not use Connor anymore.`)
				} else if (reaction.emoji.name === '💚') {
					userMember.roles.remove('762728219774025788')
					console.log(`${user.username} does not support Connie.`)
				}
			})
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