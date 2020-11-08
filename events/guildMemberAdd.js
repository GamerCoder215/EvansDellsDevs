module.exports = async (client, member) => {
	const Discord = require('discord.js');
	const Canvas = require('canvas')
	const { registerFont } = require('canvas')
	const config = require('./evt_config.json')
	const guild = client.guilds.cache.get('761571644384346143');
	// Font Registration (Canvas)
	registerFont('./fonts/PressStart2P-Regular.ttf', { family: 'press-start-2p'})
	registerFont('./fonts/SansPosterBold3D.ttf', { family: 'sans-3d'})
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
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png'}))
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
	joinCtx.font = applyText(joinCanvas, member.displayName)
	joinCtx.fillStyle = config.gold;
	joinCtx.fillText(member.displayName, 25, 325)
	// Welcome Message
	joinCtx.font = '30px sans-3d'
	joinCtx.fillStyle = config.white;
	joinCtx.fillText(`Welcome to Connor Corner,`, 25, 250)
	// Member Count
	joinCtx.font = '30px press-start-2p';
	joinCtx.fillStyle = config.pink;
	joinCtx.fillText(`Member #${guild.memberCount}`, 200, 125);
	// Attatchment Send
	const joinAttatchment = new Discord.MessageAttachment(joinCanvas.toBuffer(), 'connorcorner-join.png');
	client.channels.cache.get('761571885514358796').send(`<@${member.user.id}>`, joinAttatchment)
	// Add Unverified Role & Sorter Roles
	member.roles.add(['762721218109112380', '762728415144050698', '762720921655705690', '762721075335135282', '764364071104544819', '762728003318054944', '762721018028490774']);
	// Send to Logs
	const userJoinedEmbed = new Discord.MessageEmbed()
	.setTitle(`Member Joined`)
	.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
	.setDescription(`Name: ${member.displayName}\nID: ${member.user.id}\n\nMember #${client.guilds.cache.get('761571644384346143').memberCount}`)
	.setColor(config.blue)
	.setFooter(config.name, config.icon)
	.setTimestamp();
	client.channels.cache.get('764154120621522974').send(userJoinedEmbed);
	client.channels.cache.get('775111559130382346').setName(`Members: ${guild.memberCount}`);
}