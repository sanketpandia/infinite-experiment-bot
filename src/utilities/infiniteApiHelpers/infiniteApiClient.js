const axios = require("axios");

module.exports = (serverId) => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "x-bot-server-id": serverId,
      "x-request-type": "BOT",
      "x-bot-token": process.env.API_KEY,
    },
  });
};
