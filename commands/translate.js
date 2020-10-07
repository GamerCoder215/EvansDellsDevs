module.exports = {
	name: 'translate',
	description: 'Translate a message into a specified language.',
	aliases: ['trans', 'trns'],
	async run(client, message, args) {
		// Discord + Config + Translate Module
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		const translate = require('translate');

		// Command Sequence
		try {
		var translationMessage = args.slice(1).join(' ')
		if (args[0] === 'spanish') {
			const spanishTranslation = await (translate(translationMessage, { to: 'es'}))
		}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}