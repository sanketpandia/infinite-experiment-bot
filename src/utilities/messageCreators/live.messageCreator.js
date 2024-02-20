module.exports = class LiveMessageCreator {
  static createConciseLiveMessage(liveFlights) {
    if (liveFlights.length < 1) {
      return ["Unable to find any aircrafts in the air. Check logs!"];
    }

    let messageString = "```\n";
    const messageArr = [];
    const PAGE_LIMIT = 6;
    let counter = 0;
    liveFlights.forEach((flight) => {
      if (counter > 6) {
        messageArr.push(messageString + "\n```");
        counter = 0;
        messageString = "```\n";
      }

      // Create Formatted message
      messageString += `
Callsign: ${flight.callsign}
Aircraft: ${flight.equipment.aircraft}
Livery: ${flight.equipment.livery}
Username: ${flight.username}
Altitude: ${Math.floor(flight.flightParameters.altitude)}ft
Speed: ${Math.floor(flight.flightParameters.groundSpeed)}kts
Route: ${flight.route.origin} - ${flight.route.destination}
      `;

      // Formatted message creation complete

      counter++;
    });
    messageArr.push(messageString + "\n```");
    return messageArr;
  }
};
