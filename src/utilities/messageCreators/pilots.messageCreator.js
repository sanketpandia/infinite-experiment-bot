const { EmbedBuilder } = require("discord.js");

module.exports = class PilotsMessageCreator {
  static createPilotVaStatsMessage(data) {
    return new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Pilot Stats")
      .addFields(
        { name: "Callsign", value: data.callsign },
        { name: "Category", value: data.category },
        { name: "Flight Time", value: data.flightTime },
        { name: "Name", value: data.name },
        { name: "Rank", value: data.rank },
        {
          name: "Recent Flights Count",
          value: data.recentFlightsCount.toString(),
        },
        { name: "Status", value: data.status },
        { name: "Last Logged In", value: data.lastLoggedIn }
      )
      .setTimestamp();
    // Call .build() to get the MessageEmbed instance
  }
};
