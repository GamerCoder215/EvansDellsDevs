module.exports = async (client) => {
  console.log('Cammie is currently running correctly.');
	// NPM
	const Discord = require('discord.js');
	const config = require('./evt_config.json')
	const db = require('quick.db');
	// IN-APP
	const guild = client.guilds.cache.get('761571644384346143')
  // Set the client user's activity
	client.user.setActivity('Connor Corner', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error)
	// Set User Count
	client.channels.cache.get('775111559130382346').setName(`Members: ${guild.memberCount}`)
	const messageCountEmbed = new Discord.MessageEmbed()
	.setDescription(`Connor Corner has **${db.get(`guild_messages`)}** messages!`)
	.setColor(config.pink)
	.setTimestamp();
	setInterval(() => {
		client.channels.cache.get('766011130283294741').send(messageCountEmbed)
	}, 1000 * 60 * 60 * 12)
	// Post Self Roles & Verification
	// Pings
			const selfRolesPingsEmbed = new Discord.MessageEmbed()
			.setTitle(`Self Roles | Pings`)
			.setDescription('📣 | React to get pinged when an announcement happens.\n🗞️ | React to get pinged when small or minor updates come out.')
			.setColor(config.pink)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			const selfRolesPings = await client.channels.cache.get('764657742878605323').send(selfRolesPingsEmbed);
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
			const selfRolesCategory = await client.channels.cache.get('764657742878605323').send(selfRolesCategorizationEmbed);
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
			// Verify
			// Embed
			const reactionRolesEmbed = new Discord.MessageEmbed()
			.setTitle('React to Become Verified')
			.setAuthor(config.name, config.icon)
			.setDescription('React below to become verified and be admitted into the server! Remember, once you verify you will not be able to become unverified and you will not have permissions to this channel.')
			.setFooter(config.name, config.icon)
			.setColor(config.pink)
			.setTimestamp();
			// Reaction Listener
			const reactRolesMessage = await client.channels.cache.get('762724893758324766').send(reactionRolesEmbed);
			reactRolesMessage.react('🔓')
			const reactFilter = (reaction, user) => {
				return ['🔓'].includes(reaction.emoji.name)
			};
			const verificationMessage = reactRolesMessage.createReactionCollector(reactFilter);
			verificationMessage.on('collect', (reaction, user) => {
				if (reaction.emoji.name === '🔓') {
				var unverifiedUser = guild.member(user);
				console.log(user);
				console.log(unverifiedUser);
				unverifiedUser.roles.remove('762721218109112380');
				unverifiedUser.roles.add('762721135883583508');
				console.log(`${user.username} was admitted into the server.`)
				}
			})
};