const { PermissionFlagsBits } = require("discord.js");
const LiveApiHelper = require("../../utilities/infiniteApiHelpers/liveApiHelper");
const LiveMessageCreator = require("../../utilities/messageCreators/live.messageCreator");

module.exports = {
  name: "live_new",
  description: "This command returns aircrafts in the air for the VA",
  isDevOnly: true,
  execute: async (client, interaction) => {
    await interaction.reply("Fetching live flights for" + interaction.guildId);
    const liveApiHelper = new LiveApiHelper(interaction);
    const liveFlights = await liveApiHelper.getLiveFlights();
    console.log(liveFlights.data);
    const messages = LiveMessageCreator.createConciseLiveMessage(
      liveFlights.data
    );
    await interaction.editReply(messages[0]);
    if (messages.length > 1) {
      messages.forEach(async (element, index) => {
        if (index === 0) return;

        await interaction.followUp(element);
      });
    }
  },
  permissionsRequired: [],
};
