module.exports = {
	name: 'color',
	description: 'Generates a random color from a basic rainbow.',
	aliases: ['clr', 'colr'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('../command_config.json');
		// Color Image Table
		var colors = [
			`https://roshanphilip.files.wordpress.com/2013/10/red.jpg`,
			`https://cheryl94558.files.wordpress.com/2010/08/orange.jpg`,
			`http://images.utrechtart.com/products/optionLarge/Jacquard/jacquard-Fluor-Yellow.jpg`,
			`http://weneedfun.com/wp-content/uploads/2016/08/The-Color-Gold-5.jpg`,
			`https://cdn10.bigcommerce.com/s-raqyrv37/products/94/images/421/lime_colored_sand__37341.1454364400.750.475.jpg?c=2`,
			`https://i.ytimg.com/vi/1SMfeIw1iDM/maxresdefault.jpg`,
			`https://www.beautycolorcode.com/7df9ff.png`,
			`https://www.realmilkpaint.com/wp-content/uploads/blue-lagoon-edt-.jpg`,
			`http://www.solidbackgrounds.com/images/1680x1050/1680x1050-dark-blue-solid-color-background.jpg`,
			`https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Purplecom.jpg/200px-Purplecom.jpg`,
			`http://4.bp.blogspot.com/-2bQuxO-Wmm8/Tzc8RAOmvnI/AAAAAAAAAEU/IzYQW9X2qJw/s1600/pink%2BFF00FF.jpg`
		]
		// Command Sequence
		try {
			// Embed
			const colorEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
			.setDescription('Your color is...')
			.setImage(colors[Math.floor(Math.random() * 10)])
			.setColor(config.blue)
			.setFooter(config.name, config.icon)
			.setTimestamp();
			message.channel.send(colorEmbed);
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}