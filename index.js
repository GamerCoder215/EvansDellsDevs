// Events / Pre-Command Stuff
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const process = require('process');
// Handlers
// Command Handler
client.commands = new Discord.Collection();
// The commands collection
const generalCommandFiles = fs.readdirSync(`./commands/general/`).filter(file => file.endsWith('.js'));
const funCommandFiles = fs.readdirSync(`./commands/fun/`).filter(file => file.endsWith('.js'));
const databaseCommandFiles = fs.readdirSync(`./commands/database/`).filter(file => file.endsWith('.js'));
const educationCommandFiles = fs.readdirSync(`./commands/education/`).filter(file => file.endsWith('.js'));
const settingsCommandFiles = fs.readdirSync(`./commands/settings/`).filter(file => file.endsWith('.js'));
const moderationCommandFiles = fs.readdirSync(`./commands/moderation/`).filter(file => file.endsWith('.js'));
const loggingCommandFiles = fs.readdirSync(`./commands/logging/`).filter(file => file.endsWith('.js'));
const servermoderationCommandFiles = fs.readdirSync(`./commands/servermoderation/`).filter(file => file.endsWith('.js'));
let fileCount = 0;
let commandCount = 0;
for (const file of generalCommandFiles) {
  const command = require(`./commands/general/${file}`);
  client.commands.set(command.name, command);
  console.log(`General Command \x1b[31m${command.name}\x1b[0m loaded.`);
  db.set(`module_${command.name}`, `general`);
  fileCount++;
  commandCount++;
}
for (const file of funCommandFiles) {
  const command = require(`./commands/fun/${file}`);
  client.commands.set(command.name, command)
  console.log(`Fun Command \x1b[31m${command.name}\x1b[0m loaded.`)
  db.set(`module_${command.name}`, `fun`);
  fileCount++;
  commandCount++;
}
for (const file of databaseCommandFiles) {
  const command = require(`./commands/database/${file}`);
  client.commands.set(command.name, command)
  console.log(`Database Command \x1b[31m${command.name}\x1b[0m loaded.`)
  db.set(`module_${command.name}`, `database`);
  fileCount++;
  commandCount++;
}
for (const file of educationCommandFiles) {
  const command = require(`./commands/education/${file}`);
  client.commands.set(command.name, command);
  db.set(`module_${command.name}`, `education`);
  console.log(`Education Command \x1b[31m${command.name}\x1b[0m loaded.`)
  fileCount++;
  commandCount++;
}
for (const file of settingsCommandFiles) {
  const command = require(`./commands/settings/${file}`);
  client.commands.set(command.name, command);
  db.set(`module_${command.name}`, `settings`);
  console.log(`Settings Command \x1b[31m${command.name}\x1b[0m loaded.`)
  fileCount++;
  commandCount++;
}
for (const file of moderationCommandFiles) {
  const command = require(`./commands/moderation/${file}`);
  client.commands.set(command.name, command)
  db.set(`module_${command.name}`, `moderation`);
  console.log(`Moderation Command \x1b[31m${command.name}\x1b[0m loaded.`)
  fileCount++;
  commandCount++;
}
for (const file of loggingCommandFiles) {
  const command = require(`./commands/logging/${file}`);
  client.commands.set(command.name, command);
  db.set(`module_${command.name}`, `logging`);
  console.log(`Logging Command \x1b[31m${command.name}\x1b[0m loaded.`)
  fileCount++;
  commandCount++;
}
for (const file of servermoderationCommandFiles) {
  const command = require(`./commands/servermoderation/${file}`);
  client.commands.set(command.name, command)
  console.log(`Server Moderation Command \x1b[31m${command.name}\x1b[0m loaded.`)
  db.set(`module_${command.name}`, `servermod`);
  fileCount++;
  commandCount++;
}
module.exports = client;

let eventCount = 0;
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
    console.log(`Event \x1b[32m${eventName}\x1b[0m loaded.`)
    fileCount++;
    eventCount++;
    client.on(eventName, event.bind(null, client));
  });
  console.log(`Loaded \x1b[34m${fileCount}\x1b[0m Files Sucessfully.\n\x1b[34m${commandCount}\x1b[0m commands\n\x1b[34m${eventCount}\x1b[0m events`)
});
// Hosting
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('The dashboard is under development. Please check back later.')
})
server.listen(3000);
console.log(`\x1b[35mServer has been hosted.\x1b[0m`)
// Login
client.login(process.env.TOKEN);
console.log(`\x1b[35mBot has been logged in.\x1b[0m`)