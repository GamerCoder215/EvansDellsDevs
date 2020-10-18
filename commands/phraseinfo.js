module.exports = {
  name: 'phraseinfo',
  description: 'Find out information about a phrase.',
  education: true,
  aliases: ['phrinfo', 'lngth', 'lnth'],
  async run(client, message, args) {
    // Discord, Config & NPM Dependencies
    const Discord = require('discord.js');
    const config = require('./command_config.json');
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
      const phrase = args.slice(0).join(' ');
      if (!phrase) {
        return message.channel.send(invalidArguments);
      } else {
        var characterCount = phrase.length;
        var wordCount = phrase.split(' ').length;
        var vowelCount = phrase.replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZµ`˜¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘’”Ω≈ç√`⁄‹›ﬁﬂ‡°·‚—±ÅÍÎ˝ÓÔÒÚÆ¸˛Ç◊ı˜Â¯˘¿]/g, '').length;
        var consonantCount = phrase.replace(/[aeiouAEIOUµ`˜¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ“‘’”Ω≈ç√`⁄‹›ﬁﬂ‡°·‚—±ÅÍÎ˝ÓÔÒÚÆ¸˛Ç◊ı˜Â¯˘¿]/g, '').length;
        var characterCountNoSpaces = phrase.replace(/[ ]/g, '').length;
        const phraseInfoEmbed = new Discord.MessageEmbed()
        .setDescription(`__Phrase Info__\nCharacters: \`${characterCount}\`\nWord Count: \`${wordCount}\`\nVowel Count: \`${vowelCount}\`\nConsonant Count: \`${consonantCount}\`\nCharacter Count (No Spaces): \`${characterCountNoSpaces}\``)
        .setColor(config.gold)
        .setFooter(config.name, config.icon)
        .setTimestamp();
        message.channel.send(phraseInfoEmbed);
      }
    } catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}
