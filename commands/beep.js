import { SlashCommandBuilder } from "discord.js"

/**
 * Ashes to ashes, boops to beeps
 * @param {import "discord.js".Interaction<import("discord.js").CacheType>} interaction
 */
function beep(interaction) {
    interaction.reply("Boop!")
}

const beepCmd = new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Hello world, we are friends!")

export { beep, beepCmd }