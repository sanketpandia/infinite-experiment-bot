const PilotsApiHelper = require("../../utilities/infiniteApiHelpers/pilotsHelper");
const PilotsMessageCreator = require("../../utilities/messageCreators/pilots.messageCreator");

module.exports = {
  name: "stats",
  description: "Get Pilot stats",
  options: [
    {
      name: "type",
      description: "Type of pilot (VA, CM, or IF)",
      type: 3,
      required: true,
      choices: [
        { name: "VA", value: "VA" },
        { name: "CM", value: "CM" },
        { name: "IF", value: "IF" },
      ],
    },
    {
      name: "id",
      description: "Pilot ID",
      type: 3,
      required: true,
    },
  ],
  execute: async (client, interaction) => {
    const type = interaction.options.getString("type");
    const id = interaction.options.getString("id");

    if (!type || !id) {
      return interaction.reply({
        content: "Please provide both 'type' and 'id' parameters.",
        ephemeral: true,
      });
    }

    if (["CM", "IF"].includes(type)) {
      await interaction.reply("Not implemented yet");
      return;
    }

    const pilotsHelper = new PilotsApiHelper(interaction);

    const pilotData = await pilotsHelper.getPilotVAData(id);

    const embeddedResponse =
      PilotsMessageCreator.createPilotVaStatsMessage(pilotData);
    const pilotResponse = "```\n" + JSON.stringify(pilotData) + "\n```";

    await interaction.reply({
      embeds: [embeddedResponse],
    });
  },
};
