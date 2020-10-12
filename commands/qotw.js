module.exports = {
	name: 'questionoftheweek',
	description: 'Post a random question of the week.',
	aliases: ['qotw', 'q.o.t.w'],
	guildOnly: true,
	async run(client, message, args) {
		// Modules + Imports
		const Discord = require('discord.js');
		const managerRole = require('./botManagerRole.js');
		// QOTD Array
		var questions = [
			'What is your favorite color? Why?',
			'What is your favorite video game? Why?',
			'In your opinion, explain why you chose Discord.',
			'When is your birthday?',
			'What country are you from?',
			'What is your dream job? Why?',
			'How many times have you been to a theme park?',
			'Where is your favorite water park?',
			'Do you have a youtube / twitch channel? Why do you upload there?',
			'Why did you join this server and what makes it a good one?',
			'Have you ever been confused about something you\'ve mastered?',
			'What makes you feel good?',
			'Do you have any siblings? How do you feel about them?',
			'What is your favorite sport?',
			'Are you religious?',
			'What kind of food do you like?',
			'Do you like card games or board games better?',
			'Do you think of yourself as an introvert or an extrovert?',
			'Are you a cat person or a dog person? Why?',
			'Are you more of a nerd or a jock? Why?',
			'If you weren\'t afraid of anything, what horror movie would you watch?',
			'If you were a teacher, what subject would you teach? Why?',
			'Do you prefer an Android or iPhone? Why?',
			'What\'s the stupidest thing you\'ve heard?',
			'How many pets do you have?',
			'Do you like to code? Why?',
			'What device are you using right now?',
			'Are you a boomer, millenial, or gen-z?',
			'What is your favorite movie?',
			'Do you play more or watch TV more?',
			'What would you say to your 2019 self before the new year?',
			'What kind of genre of music do you like?',
			'How many friends do you have?',
			'Do you prefer a taco or a hamburger?',
			'Do you like YouTube or Twitch better? Why?',
			'Do you own a server? Why?',
			'Minecraft or Fortnite?',
			'If you could make any game the most popular in the world, which one would it be?',
			'Xbox 1, PS4, or Nintendo Switch?',
			'Who is your role model?',
			'How many days are in the month you were born?',
			'Have you joined the support server? Why/Why not?',
			'What\'s your favorite CodeClan Bot?',
			'Do you like discord.js or discord.py better?',
			'What board game do you hate the most?',
			'If you could rid the world of one disease what would it be?',
			'If you were offered the position of mayor of your city, would you take it?',
			'What is your favorite day of the week?',
			'If you inherited or won a million dollars, what’s the very first thing you would do with the money?',
			'Give me the names of 3 objects or things you love most and why?',
			'Which are your top bands or singers?',
			'What school activities do you or did you participate in?',
			'What jobs do your parents have / had?',
			'What were your childhood pets?'	
		]
		// Other Arrays
		var sucessMessages = [
    `Congrats ${message.author.username}, your action was sucessful.`,
    `Mission Accomplished, ${message.author.username}.`,
    `Your action was sucessful, ${message.author.username}.`,
    `${message.author.username}\'s action was sucessful.`,
    `All systems go, ${message.author.username}!`
    ]
		// Embeds
		const actionSuccessful = new Discord.MessageEmbed()
    .setTitle('Action Sucessful')
    .setDescription(sucessMessages[Math.floor(Math.random() * 5)])
    .setFooter('', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#4DFFFF')
    .setTimestamp();
		const invalidPermissions = new Discord.MessageEmbed()
    .setTitle('Error 03')
    .setDescription('You do not have permission to use this command.')
    .setFooter(`${message.author.username}`, 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
    .setColor('#ff0000')
    .setTimestamp();
		const invalidArguments = new Discord.MessageEmbed()
      .setTitle('Error 02')
      .setDescription('You have provided invalid arguments!')
      .setFooter(`${message.author.username}`, 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
      .setColor('#ff0000')
      .setTimestamp();
		// Channl Mention to ID
		function getChannelFromMention(mention) {
	      if (!mention) return;

        if (mention.startsWith('<#') && mention.endsWith('>')) {
          var mentionID = mention.replace(/[<#>]/g,'');
          return (mentionID);
        }
      }
		try {
			if (!message.member.hasPermission('MANAGE_MESSAGES') &&!message.member.roles.cache.get(managerRole.managerRole)) {
				return message.channel.send(invalidPermissions);
			} else {
			var qotwChannel = getChannelFromMention(args[0]);
			// Embed
			const qotwEmbed = new Discord.MessageEmbed()
			.setTitle(`QOTW | \`${message.author.username}\``)
			.setDescription(questions[Math.floor(Math.random() * 54)])
			.setColor('#4DFFFF')
			.setFooter('', 'https://cdn.discordapp.com/attachments/642928521181790218/756142992406085692/LogoMakr_1u6iSn.png')
			.setTimestamp();
			// Argument Check
			if (!args[0].startsWith('<#') && !args[0].endsWith('>')) {
				return message.channel.send(invalidArguments);
			} else {
			// Send Sequence
			if (args[1]) {
			client.channels.cache.get(qotwChannel).send(args[1], qotwEmbed)
			message.channel.send(actionSuccessful);
			} else if (!args[1]) {
			client.channels.cache.get(qotwChannel).send(qotwEmbed);
			message.channel.send(actionSuccessful);
			}
			}
		}
	} catch (error) {
			console.error(error);
			message.reply(`Internal Error: "${error}"; Contact GamerCoder__#2640 / Support Server (Copy this error)`);
		}
	}
}