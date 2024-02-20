const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const dotenv = require("dotenv").config();

const { TOKEN } = process.env;

const client = new Client({
  intents: [],
});

eventHandler(client);

client.login(TOKEN);
