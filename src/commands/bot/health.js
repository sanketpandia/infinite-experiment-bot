const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "health",
  description: "Check bot's health status",
  execute: async (client, interaction) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const response = await interaction.reply({
      content:
        "Bot is running!\n" +
        `Uptime: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`,
    });
  },
};
