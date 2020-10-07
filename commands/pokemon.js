module.exports = {
  name: 'pokemon',
  description: 'Find out your dream pokemon',
  aliases: ['pkm', 'poke', 'pk'],
  async run(client, message, args) {
    // Discord + Config
    const Discord = require('discord.js');
    const config = require('./command_config.json');
    // GIF Table
    var pokemon = [
      `http://31.media.tumblr.com/536f3f15496de60ed36aa2448dcbd548/tumblr_mgqbsmlQo81rv6iido1_500.gif`,
      `https://33.media.tumblr.com/927365f0bbdd1f3d2f852bac8759f89b/tumblr_mh8a7wx1WG1rfjowdo1_r2_500.gif`,
      `https://data.whicdn.com/images/225688808/original.gif`,
      `https://i.pinimg.com/originals/f3/51/9e/f3519ece362687db83b1514e34df4535.gif`,
      `http://fc01.deviantart.net/fs71/f/2011/363/2/d/lapras_used_ice_beam_by_joshr691-d4kmmxx.gif`,
      `https://78.media.tumblr.com/tumblr_m3d8idqyGJ1rnwxlro1_500.gif`,
      `https://66.media.tumblr.com/5a163244be88681b0494014c291594ab/tumblr_nujmfq5gUn1s3bc1no2_250.gif`,
      `https://66.media.tumblr.com/4356c37b33e2684bda17feebd479363f/tumblr_nujmfq5gUn1s3bc1no1_r1_250.gif`,
      `https://78.media.tumblr.com/a0f0e55555ba27229ad97965d5a1f0ea/tumblr_o6rxakd7lg1txe8e9o1_500.gif`,
      `https://66.media.tumblr.com/e411db3a2acdee8cd039b808e76d55e4/tumblr_poxm9ulEUu1tka7tlo1_500.gifv`,
      `http://static.tumblr.com/095ba9b433fed8a9b0168c90126004c7/hvvq7py/Fkbnfh6wh/tumblr_static_7csm841nzg4c8ck44w404ww4w.gif`,
      `https://media.giphy.com/media/HH2bb3Pjq5IB2/giphy.gif`,
      `https://vignette.wikia.nocookie.net/horadeaventura/images/0/09/Pidgeotto.gif/revision/latest?cb=20160215000320&path-prefix=es`,
      `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F33.media.tumblr.com%2Ftumblr_mb4fvyvP2H1rfjowdo1_500.gif&f=1&nofb=1`,
      `http://38.media.tumblr.com/tumblr_maorbj6OOz1rfjowdo1_500.gif`,
      `https://i.pinimg.com/originals/e6/89/20/e6892062fcf35c58c7fd0834ab59ec1f.gif`,
      `http://fc02.deviantart.net/fs49/f/2009/211/a/3/Crystal_Machoke_Rewamp_by_Pokemon_Diamond.gif`,
      `https://media.giphy.com/media/EogYCe8XJOgbS/giphy.gif`,
      `https://i.pinimg.com/originals/32/a6/88/32a6883c4d90ce18f01fb552f8418965.gif`,
      `http://pa1.narvii.com/5834/272c02e8faf8325a7d5d9b4fd2082aaf3202be64_hq.gif`,
      `http://pa1.narvii.com/6167/e5315aac093cd2f3041a81edfc52012a5b572540_00.gif`,
      `http://media.giphy.com/media/CjWgCaiHGh4be/giphy.gif`,
      `https://i.gifer.com/origin/3c/3c54c75eb777733fa91df536d7c54f17_w200.gif`,
      `http://38.media.tumblr.com/551a1a074aa1ee1424e218a3914f6130/tumblr_n9dzjm0pJC1s3bc1no2_500.gif`
    ]
	try {
    const pokemonEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
    .setDescription(`\`Your pokemon, ${message.author.username}, is:\``)
    .setImage(pokemon[Math.floor(Math.random() * 24)])
    .setFooter('ConnorBot', config.icon)
    .setTimestamp();
    message.channel.send(pokemonEmbed);
		} catch (error) {
			message.reply(config.error)
			console.error(error)
		}
  }
}
