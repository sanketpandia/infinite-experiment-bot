const { PermissionFlagsBits } = require("discord.js");
const LiveApiHelper = require("../../utilities/infiniteApiHelpers/liveApiHelper");
const LiveMessageCreator = require("../../utilities/messageCreators/live.messageCreator");

const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "live_new",
  description: "This command returns aircrafts in the air for the VA",
  execute: async (client, interaction) => {
    await interaction.reply("Fetching live flights for" + interaction.guildId);
    const liveApiHelper = new LiveApiHelper(interaction);
    const liveFlights = await liveApiHelper.getLiveFlights();
    const messages = LiveMessageCreator.createConciseLiveMessage(
      liveFlights.data
    );
    if (messages.length <= 1) {
      await interaction.editReply(messages[0]);
      return;
    }

    // From sampler

    const buttons = getButtonComponents("-1", "1", false, true);
    const row = new ActionRowBuilder().addComponents(buttons[0], buttons[1]);

    const response = await interaction.editReply({
      content: messages[0],
      components: [row],
    });
    // const response = await interaction.reply({
    //   content:
    //     "Bot is running!\n" +
    //     `Uptime: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`,
    //   components: [row],
    // });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 120000,
    });

    collector.on("collect", async (i) => {
      const selection = parseInt(i.customId);

      const paginationButtons = getButtonComponents(
        (selection - 1).toString(),
        (selection + 1).toString(),
        selection + 1 >= messages.length,
        selection - 1 < 0
      );
      const paginationRow = new ActionRowBuilder().addComponents(
        paginationButtons[0],
        paginationButtons[1]
      );
      await i.reply(
        `${i.user} has selected ${selection + 1}!\n Page ${selection + 1} of ${
          messages.length
        }`
      );
      await interaction.editReply({
        content: messages[selection],
        components: [paginationRow],
      });
    });
    // End sampler

    return;
  },
};

function getButtonComponents(
  previousIndex,
  nextIndex,
  nextDisabled = false,
  previousDisabled = false
) {
  const next = new ButtonBuilder()
    .setCustomId(nextIndex)
    .setLabel("Next Page")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(nextDisabled);

  const previous = new ButtonBuilder()
    .setCustomId(previousIndex)
    .setLabel("Previous Page")
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(previousDisabled);
  return [previous, next];
}
