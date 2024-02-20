const { devs, testServer } = require("../../configs/masterConfig.json");
const getLocalCommands = require("../../utilities/commandHelpers/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();
  console.log(interaction.commandName);
  try {
    const commandObjectPath = localCommands.find((cmd) => {
      const command = require(cmd);
      return command.name === interaction.commandName;
    });

    const commandObject = require(commandObjectPath);

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: false,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: "This command cannot be ran here.",
          ephemeral: false,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "Not enough permissions.",
            ephemeral: false,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: false,
          });
          return;
        }
      }
    }

    await commandObject.execute(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
    console.log(error);
  }
};
