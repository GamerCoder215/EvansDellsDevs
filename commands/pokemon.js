module.exports = {
	name: 'pokemon',
	description: 'Find out your dream pokemon!',
	aliases: ['pkmn', 'poke', 'pkm'],
	async run(client, message, args) {
		// Discord
		const Discord = require('discord.js');
		// Pokemon GIF List
		const pokemonGIFs = [
		`http://24.media.tumblr.com/95dfab49ae8df44e3c93e9f8ad8e3aa0/tumblr_mpnjlgiJxp1snxs87o1_400.gif`,
		`https://gifimage.net/wp-content/uploads/2017/11/gyarados-gif-11.gif`,
		`https://media.tenor.com/images/e73254cab7237eae01c39ab66feb609c/tenor.gif`,
		`https://33.media.tumblr.com/ca18d52c7ea791455c68cc3e9f329197/tumblr_mwr2q2RXmx1skql9vo7_250.gif`,
		`https://31.media.tumblr.com/3cf34eaff4ef3394d36deab18b2c77c5/tumblr_np1vn2JTFx1qbx3x5o1_500.gif`,
		`https://data.whicdn.com/images/225688808/original.gif`,
		`https://i.pinimg.com/originals/f3/51/9e/f3519ece362687db83b1514e34df4535.gif`,
		`http://31.media.tumblr.com/536f3f15496de60ed36aa2448dcbd548/tumblr_mgqbsmlQo81rv6iido1_500.gif`,
		`https://66.media.tumblr.com/tumblr_mb7ajc09St1rfjowdo1_500.gif`,
		`https://66.media.tumblr.com/e411db3a2acdee8cd039b808e76d55e4/tumblr_poxm9ulEUu1tka7tlo1_500.gif`,
		`https://img.gifmagazine.net/gifmagazine/images/31257/original.gif`
		]
		// Choice Embed
		const pokemonEmbed = new Discord.MessageEmbed()
		.setDescription('Your pokemon is...')
		.setImage(pokemonGIFs[Math.floor(Math.random() * 8)])
		.setColor('#ffd700')
		.setTimestamp();
		message.channel.send(pokemonEmbed);
	}
}