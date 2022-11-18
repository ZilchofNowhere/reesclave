import { SlashCommandBuilder } from "discord.js"

/**
 * Torture a victim
 * @param {import "discord.js".Interaction<import("discord.js").CacheType>} interaction
 */
function torture(interaction) {
  const victim = interaction.options.getUser("victim")
  const message = interaction.options.getString("message", false)

  victim.createDM().then((dm) => {
    if (message == "") {
      for (let i = 0; i < 18; i++) {
        dm.send("You are currently being tortured by an unknown evil person :smiling_imp:")
      }
    } else {
      for (let i = 0; i < 18; i++) {
        dm.send(message)
      }
    }
  })

  interaction.reply({
    content: "Target successfully tortured to death.",
    ephemeral: true
  })
}

const tortureCmd = new SlashCommandBuilder()
  .setName("torture")
  .setDescription("Torture a victim of your choice")
  .addUserOption((option) =>
    option
      .setName("victim")
      .setDescription("Poor soul to be tortured")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("Add an optional message")
      .setRequired(false)
  )

export { torture, tortureCmd }
