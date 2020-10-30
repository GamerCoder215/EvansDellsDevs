module.exports = {
	name: 'game',
	description: 'Find your ideal video game.',
	aliases: ['videogame', 'gme', 'gm'],
	guildOnly: true,
	async run(client, message, args) {
	// Discord + Config
	const Discord = require('discord.js');
	const config = require('../command_config.json');
	// Games Table
	var videogames = [
		`http://www.picgifs.com/games-gifs/games-gifs/minecraft/picgifs-minecraft-1121085.gif`,
		`https://media1.tenor.com/images/b51b1e9df562671afcaf3d78be23e637/tenor.gif?itemid=12185490`,
		`https://thumbs.gfycat.com/IdealFantasticBlacklab-max-1mb.gif`,
		`https://media1.tenor.com/images/ef4993b593954811a0c0a1c98af698a3/tenor.gif?itemid=16399941`,
		`http://gifimage.net/wp-content/uploads/2017/10/mario-running-gif-6.gif`,
		`https://gifimage.net/wp-content/uploads/2018/11/sonic-hedgehog-gif-8.gif`,
		`https://cdn.vox-cdn.com/thumbor/LQWpKkq3Y20D5BOj58d2ZmR7ank=/0x64:550x373/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/35980446/aZkuP0D.0.0.gif`,
		`https://media.giphy.com/media/LXONhtCmN32YU/giphy.gif`,
		`https://media1.tenor.com/images/20249ebcdf373979515884978309ea1d/tenor.gif?itemid=6023939`,
		`https://vignette.wikia.nocookie.net/projectxzone/images/9/9c/Sound_test_kirby_by_evanspritemaker-db0i7pl.gif/revision/latest?cb=20180122171553`,
		`https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/24b9ff55694437.598f19d94364e.gif`,
		`https://media.giphy.com/media/lP4t67hQwR3Ta/giphy.gif`
	]
		try {
		const gameEmbed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription('Your video game is...')
		.setImage(videogames[Math.floor(Math.random() * 11)])
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.channel.send(gameEmbed);
		} catch (error) {
			console.error(error)
			message.reply(config.error)
		}
	}
}