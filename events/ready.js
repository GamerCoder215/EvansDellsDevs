module.exports = async (client) => {
  console.log('AnnounceBot is running correctly.');
	const Discord = require('discord.js')
  // Set the client user's activity
client.user.setActivity('?help | ConnorBot', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
};