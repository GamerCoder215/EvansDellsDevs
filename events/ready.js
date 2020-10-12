module.exports = async (client) => {
  console.log('Cammie is currently running correctly.');
	const Discord = require('discord.js')
  // Set the client user's activity
client.user.setActivity('Connor Corner', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error)
};