module.exports = {
	name: 'emit',
	description: 'Emits a certain action.',
	guildOnly: true,
	async run(client, message, args) {
		// Discord, Config & Dependencies
		const Discord = require('discord.js');
		const Canvas = require('canvas');
		const { registerFont } = require('canvas')
		const config = require('./cmd_config.json');
		// Invalid Args Embed
		const invalidArgs = new Discord.MessageEmbed()
		.setTitle('Error')
		.setDescription(`Sorry ${message.author.username}, 	you have invalid arguments!`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Font Reigstration (For Canvas Dependency)
		registerFont('./fonts/PressStart2P-Regular.ttf', { family: 'press-start-2p'})
		registerFont('./fonts/SansPosterBold3D.ttf', { family: 'sans-3d'})
		// Invalid Permissions Embed
		const invalidPerms = new Discord.MessageEmbed()
		.setDescription(`Sorry ${message.author.username}, you do not have permission to use this command.`)
		.setColor(config.red)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		// Command Sequence
		try {
			if (!message.member.hasPermission('MANAGE_SERVER') && !message.member.roles.has(config.permrole)) {
			return message.channel.send(invalidPerms)
			} else {
				if (args[0] === 'guildMemberAdd') {
					// Image Creation
					const joinCanvas = Canvas.createCanvas(700, 350)
					const joinCtx = joinCanvas.getContext('2d');
					// Background
					joinCtx.strokeStyle = config.blue;
					joinCtx.strokeRect(0, 0, joinCanvas.width, joinCanvas.height);
					const joinBackground = await Canvas.loadImage('https://images.freecreatives.com/wp-content/uploads/2016/02/Download-Free-Blue-Gradient-Background.jpg')
					joinCtx.drawImage(joinBackground, 0, 0, joinCanvas.width, joinCanvas.height)
					// Avatar + Border
					joinCtx.beginPath();
					joinCtx.lineWidth = "12";
					joinCtx.strokeStyle = config.blue;
					joinCtx.rect(25, 25, 150, 150)
					joinCtx.stroke();
					joinCtx.closePath();
					const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png'}))
					joinCtx.drawImage(avatar, 25, 25, 150, 150)
					// Connor's Avatar
					const connor = await Canvas.loadImage('https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
					joinCtx.drawImage(connor, 575, 25, 100, 100)
					// All Text
					const applyText = (canvas, text) => {
					const ctx = canvas.getContext('2d');

					// Declare a base size of the font
					let fontSize = 70;

					do {
				// Assign the font to the context and decrement it so it can be measured again
				ctx.font = `${fontSize -= 10}px press-start-2p`;
				// Compare pixel width of the text to the canvas minus the approximate avatar size
				} while (ctx.measureText(text).width > canvas.width - 300);

				// Return the result to use in the actual canvas
				return ctx.font;
				};
				// Name
				joinCtx.font = applyText(joinCanvas, message.author.username)
				joinCtx.fillStyle = config.gold;
				joinCtx.fillText(message.author.username, 25, 325)
				// Welcome Message
				joinCtx.font = '30px sans-3d'
				joinCtx.fillStyle = config.white;
				joinCtx.fillText(`Welcome to Connor Corner,`, 25, 250)
				// Member Count
				joinCtx.font = '30px press-start-2p';
				joinCtx.fillStyle = config.pink;
				joinCtx.fillText(`Member #${client.guilds.cache.get(message.guild.id).memberCount}`, 200, 125);
					// Attatchment Send
					const joinAttatchment = new Discord.MessageAttachment(joinCanvas.toBuffer(), 'connorcorner-join.png');
					message.channel.send(`<@${message.author.id}>`, joinAttatchment)
				} else {
					return message.channel.send(invalidArgs);
				}
			}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}