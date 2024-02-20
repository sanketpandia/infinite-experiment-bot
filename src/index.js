const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const dotenv = require("dotenv").config();

const { BOT_ID, TOKEN1 } = process.env;

const client = new Client({
  intents: [],
});

eventHandler(client);

client.login(TOKEN1);
