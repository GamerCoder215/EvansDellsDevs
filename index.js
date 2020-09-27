 // Events / Pre-Command Stuff
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const keepAlive = require('./server');

// Handlers
// Command Handler (Modules)
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
module.exports = client;

// Event Handler
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		// If the file is not .js, it ignores
		if (!file.endsWith('.js')) return;
		// Load the event file
		const event = require(`./events/${file}`);
		// Get event from file name
		const eventName = file.split('.')[0];

		client.on(eventName, event.bind(null, client));
	});
});

// When bot joins a server, this happens:
client.on("guildCreate", guild => {
  var found = false;
  guild.channels.cache.forEach(function(channel, id) {
      // If a channel is already found, nothing more needs to be done
      if(found == true || channel.type != "text") {
        return;
      }
      // If the channel isn't found and the bot has permission to 
      // send and read messages in the channel, send a welcome message there
      if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
        found = true;
				const welcomeEmbed = new Discord.MessageEmbed()
				.set('Hiya, I\'m ConnorBot!')
				.setDescription(':759315243335024650: Thanks for adding me to the server! Here are a couple things to get started:\n\n\`?help\` for a list of modules.\n\n\`?prefix <prefix>\` for a custom prefix (Limit of 4 characters; no spaces allowed.) If you need more help with our modules, use those help pages! Otherwise, bye-bye!')
				.setColor('#00AACC')
				.setFooter('Hiya!', 'https://cdn.discordapp.com/attachments/759105938233491526/759315061482717214/Connor.png')
				.setTimestamp();
        return channel.send(welcomeEmbed);
      }
  })
});

keepAlive();
// Login
client.login(process.env.TOKEN);