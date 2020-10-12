 // Events / Pre-Command Stuff
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

// Handlers
// Command Handler
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
// Always Online thing
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});

// Login
client.login(process.env.TOKEN);