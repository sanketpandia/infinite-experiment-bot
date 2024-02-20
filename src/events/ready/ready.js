module.exports = (client) => {
  console.log(`${client.user.username} is online!`);

  client.user.setPresence({
    activities: [{ name: "We're back! /live_new is up!" }],
    status: "online",
  });
};
