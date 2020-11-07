module.exports = {
	name: 'whitelist',
	description: 'Add users to the whitelist',
	database: true,
	aliases: ['whtlst', 'whitelst', 'wlist'],
	async run(client, message, args) {
		// Discord, Config & NPM Dependencies
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		const db = require('quick.db');
		// Tables
		// Invalid Args Table
		const invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`,
		];
		const sucessMessages = [
			`Your action was sucessful, ${message.author.username}`,
			`${message.author.username}'s action was sucessful.`,
			`Congradulations ${message.author.username}, your action was sucessful.`,
			`Excellent! ${message.author.username} had their action a sucess.`,
			`Connor found out about your action ${message.author.username}, \nand he helped it become a sucess.`,
		];
		// Embeds
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
			.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
			.setColor(config.red)
			.setAuthor('', message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
			.setFooter(config.name, config.icon)
			.setTimestamp();
		// Action Sucessful Embed
		const actionSucessful = new Discord.MessageEmbed()
			.setDescription(sucessMessages[Math.floor(Math.random() * 5)])
			.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
			.setColor('#D8D52B')
			.setFooter('ConnorBot', config.icon)
			.setTimestamp();
    // Password Enabled
    const passwordEnabled = new Discord.MessageEmbed()
    .setDescription(`Sorry ${message.author.username}, but password is enabled!`)
    .setColor(config.red)
    .setFooter(config.name, config.icon)
    .setTimestamp();
    // Get ID function
    function getID(mention) {
      if (!mention) return;
      if (mention.startsWith('<@') && mention.endsWith('>')) {
        var mentionID = mention.replace(/[<@!>]/g, '');
        return (mentionID);
      } else return;
    }
		// Command Sequence
		try {
			if (!args[0]) return message.channel.send(invalidArguments);
			var whitelist = new db.table(`whitelist_${args[0]}`);
      if (args[0] === 'enable') {
        if (db.get(`password_${args[1]}`) === true) {
          return message.channel.send(passwordEnabled);
      } else {
      db.set(`whitelist_${args[1]}`, true);
      message.channel.send(actionSucessful);
        }
      } else if (args[0] === 'disable') {
      db.set(`whitelist_${args[1]}`, false);
      message.channel.send(actionSucessful);
      } else if (args[0] === 'add') {
				whitelist.push(`users`, `${getID(args[2])}`);
        message.channel.send(actionSucessful);
      } else if (args[0] === 'remove') {
				db.push(`whitelist_${args[1]}.users`, `${getID(args[2])}`);
				message.channel.send(actionSucessful);
      } else {
      return message.channel.send(invalidArguments);
    }
  } catch (error) {
		console.error(error);
		message.reply(config.error);
		}
	},
};
