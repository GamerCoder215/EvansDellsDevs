 // Events / Pre-Command Stuff
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

// Handlers
// Command Handler
client.commands = new Discord.Collection();
// The commands collection
const generalCommandFiles = fs.readdirSync(`./commands/general/`).filter(file => file.endsWith('.js'));
const funCommandFiles = fs.readdirSync(`./commands/fun/`).filter(file => file.endsWith('.js'));
const databaseCommandFiles = fs.readdirSync(`./commands/database/`).filter(file => file.endsWith('.js'));
const advtoolsCommandFiles = fs.readdirSync(`./commands/advtools/`).filter(file => file.endsWith('.js'));
const educationCommandFiles = fs.readdirSync(`./commands/education/`).filter(file => file.endsWith('.js'));
const settingsCommandFiles = fs.readdirSync(`./commands/settings/`).filter(file => file.endsWith('.js'));
const moderationCommandFiles = fs.readdirSync(`./commands/moderation/`).filter(file => file.endsWith('.js'));
const loggingCommandFiles = fs.readdirSync(`./commands/logging/`).filter(file => file.endsWith('.js'));
const servermoderationCommandFiles = fs.readdirSync(`./commands/servermoderation/`).filter(file => file.endsWith('.js'));
for (const file of generalCommandFiles) {
    const command = require(`./commands/general/${file}`);
    client.commands.set(command.name, command);
}
for (const file of funCommandFiles) {
	const command = require(`./commands/fun/${file}`);
	client.commands.set(command.name, command)
}
for (const file of databaseCommandFiles) {
	const command = require(`./commands/database/${file}`);
	client.commands.set(command.name, command)
}
for (const file of advtoolsCommandFiles) {
	const command = require(`./commands/advtools/${file}`);
	client.commands.set(command.name, command)
}
for (const file of educationCommandFiles) {
	const command = require(`./commands/education/${file}`);
	client.commands.set(command.name, command)
}
for (const file of settingsCommandFiles) {
	const command = require(`./commands/settings/${file}`);
	client.commands.set(command.name, command)
}
for (const file of moderationCommandFiles) {
	const command = require(`./commands/moderation/${file}`);
	client.commands.set(command.name, command)
}
for (const file of loggingCommandFiles) {
	const command = require(`./commands/logging/${file}`);
	client.commands.set(command.name, command)
}
for (const file of servermoderationCommandFiles) {
	const command = require(`./commands/servermoderation/${file}`);
	client.commands.set(command.name, command)
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
require("express")().use(require("express").static(__dirname + "/dashboard")).listen(8080)
console.log(`Server has been hosted.`)
// Login
client.login(process.env.TOKEN);