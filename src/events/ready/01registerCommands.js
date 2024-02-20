const { botSettings } = require("../../configs/masterConfig.json");
const getApplicationCommands = require("../../utilities/commandHelpers/getApplicationCommands");
const getLocalCommands = require("../../utilities/commandHelpers/getLocalCommands");
const areCommandsDifferent = require("../../utilities/commandHelpers/compareCommands");

module.exports = async (client) => {
  const testServer = botSettings.testServer;

  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = require(localCommand);

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }
        console.log(name, description, options);
        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log(`TThere was an error: ${error.stack}`);
  }
};
