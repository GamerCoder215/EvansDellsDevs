module.exports = async (client) => {
  console.log('\x1b[36mConnor is currently running correctly.\x1b[0m');
	const Discord = require('discord.js')
  // Set the client user's activity (randomly)
	setInterval(() => {
	var chooser = Math.floor(Math.random() * 4)
	if (chooser === 0) chooser = 1;
	if (chooser === 1) {
	var playingPresences = [
		`?help`,
		`video games`,
		`with MEE6 and Carl-bot`,
		`outside`,
		`with JavaScript`
	]
	var playingRandom = playingPresences[Math.floor(Math.random() * 5)]
	client.user.setActivity(playingRandom, { type: 'PLAYING'})
	} else if (chooser === 2) {
	var watchingPresences = [
		`${client.guilds.cache.size} servers`,
		`Harry doing arson`,
		`Carl-Bot`,
		`Pewdiepie`,
		`Minecraft Videos`
	]
	var watchingRandom = watchingPresences[Math.floor(Math.random() * 5)]
	client.user.setActivity(watchingRandom, { type: 'WATCHING' })
	} else if (chooser === 3) {
	var listeningPresences = [
		`developer's sadness`,
		`Raneter's Screams`,
		`suggestions`,
		`pings`,
		`Mykah's music`
	]
	var listeningRandom = listeningPresences[Math.floor(Math.random() * 5)]
	client.user.setActivity(listeningRandom, { type: 'LISTENING' })
	}
	}, 1000 * 30)
};	