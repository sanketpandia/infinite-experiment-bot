const infiniteApiClient = require("./infiniteApiClient");

module.exports = class LiveApiHelper {
  infiniteApiClient;
  interaction;

  constructor(interaction) {
    this.interaction = interaction;
    this.infiniteApiClient = infiniteApiClient(interaction.guildId);
  }

  async getLiveFlights() {
    const flights = await this.infiniteApiClient.get(`live-flights/server`);
    return flights;
  }
};
