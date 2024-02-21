const infiniteApiClient = require("./infiniteApiClient");

module.exports = class PilotsApiHelper {
  infiniteApiClient;
  interaction;

  constructor(interaction) {
    this.interaction = interaction;
    this.infiniteApiClient = infiniteApiClient(interaction.guildId);
  }

  async getPilotVAData(pilotId) {
    const pilotData = await this.infiniteApiClient.get(
      `pilots/stats/va/${pilotId}`
    );
    return pilotData.data;
  }
};
