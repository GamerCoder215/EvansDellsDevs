module.exports = {
  name: 'turn',
  description: 'Turns a message upside down.',
  aliases: ['t', 'upsidedown', 'updown'],
  async run(client, message, args) {
    // Discord + Config
    const Discord = require('discord.js');
		const config = require('../command_config.json');
    // Invalid Args Table
		var invalidArgumentMessages = [
			`Sorry ${message.author.username}, you have provided invalid arguments.`,
			`Hey there ${message.author.username}! You have provided some invalid arguments.`,
			`Let's see ${message.author.username}, you have some invalid arguments.`,
			`Hey ${message.author.username}, you have invalid arguments!`,
			`Please provide some valid arguments, ${message.author.username}`
		]
		// Invalid Args Embed
		const invalidArguments = new Discord.MessageEmbed()
		.setDescription(invalidArgumentMessages[Math.floor(Math.random() * 5)])
		.setColor(config.red)
		.setAuthor('', message.author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
		.setFooter(config.name, config.icon)
		.setTimestamp();
    // Command Sequence
	  try {
	      var newMessage = args.slice(0).join(' ')
	      var upsidedownMessage = newMessage.replace('a', 'ɐ').replace('b', 'q').replace('c', 'ɔ').replace('d', 'p').replace('e', 'ǝ').replace('f', 'ɟ').replace('g', 'ƃ').replace('h', 'ɥ').replace('i', 'ᴉ').replace('j', 'ɾ').replace('k', 'ʞ').replace('m', 'ɯ').replace('n', 'u').replace('p', 'd').replace('q', 'b').replace('r', 'ɹ').replace('t', 'ʇ').replace('u', 'n').replace('v', 'ʌ').replace('w', 'ʍ').replace('y', 'ʎ').replace().replace().replace('1', 'Ɩ').replace('3', 'Ɛ').replace('4', 'h').replace('6', '9').replace('7', 'ㄥ').replace('9', '6').replace('!', '¡').replace('&', '⅋').replace('_', '‾').replace('?', '¿').replace('\'', ',').replace('\"',
	       ',,');
	      // Embed
	       const turnEmbed = new Discord.MessageEmbed()
	       .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
	       .setDescription(upsidedownMessage)
	       .setColor(config.blue)
	       .setFooter(config.name, config.icon)
	       .setTimestamp();
	   if (!args[0]) {
	   return message.channel.send(invalidArguments)
	  } else {
	   message.channel.send(turnEmbed);
	  }
	} catch (error) {
		message.reply(config.error);
		console.error(error);
		}
  }
}
