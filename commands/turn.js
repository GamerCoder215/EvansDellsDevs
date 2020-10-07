module.exports = {
  name: 'turn',
  description: 'Turns a message upside down.',
  aliases: ['t', 'upsidedown', 'updown'],
  async run(client, message, args) {
    // Discord + Config
    const Discord = require('discord.js');
		const config = require('./command_config.json');
	try {
	var newMessage = args.slice(0).join(' ')
	var upsidedownMessage = newMessage.replace('a', 'ɐ').replace('b', 'q').replace('c', 'ɔ').replace('d', 'p').replace('e', 'ǝ').replace('f', 'ɟ').replace('g', 'ƃ').replace('h', 'ɥ').replace('i', 'ᴉ').replace('j', 'ɾ').replace('k', 'ʞ').replace('m', 'ɯ').replace('n', 'u').replace('p', 'd').replace('q', 'b').replace('r', 'ɹ').replace('t', 'ʇ').replace('u', 'n').replace('v', 'ʌ').replace('w', 'ʍ').replace('y', 'ʎ').replace().replace().replace('1', 'Ɩ').replace('3', 'Ɛ').replace('4', 'h').replace('6', '9').replace('7', 'ㄥ').replace('9', '6').replace('!', '¡').replace('&', '⅋').replace('_', '‾').replace('?', '¿').replace('\'', ',').replace('\"', 
	',,');
	// Embed
	const turnEmbed = new Discord.MessageEmbed()
	.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
	.setDescription(upsidedownMessage)
	.setColor('#00feff')
	.setFooter('ConnorBot', config.icon)
	.setTimestamp();
	if (!args[0]) {
	
	} else {
	message.channel.send(turnEmbed);
	}
		} catch (error) {
			message.reply(config.error);
			console.error(error);
		}
  }
}
