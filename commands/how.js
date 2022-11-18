import { SlashCommandBuilder } from 'discord.js'

/**
 * Measures how much someone is something.
 * @param {import 'discord.js'.Interaction<import('discord.js').CacheType>} interaction
*/
function how(interaction) {
    const victim = interaction.options.getString("victim")
    const quality = interaction.options.getString("quality")

    if (quality !== "smart") {
        interaction.reply(`${victim[0].toUpperCase() + victim.substring(1)} is ${Math.floor(Math.random() * 100)}% ${quality}.`)
    } else {
        interaction.reply(`${victim[0].toUpperCase() + victim.substring(1)}'s IQ is ${Math.floor(Math.random() * 180)} points.`)
    }
}

const howCmd = new SlashCommandBuilder()
    .setName('how')
    .setDescription("Measures how much someone is something.")
    .addStringOption((option) => 
        option
            .setName("quality")
            .setDescription("What you want to measure")
            .setRequired(true)
            .addChoices(
                {
                    name: "gay",
                    value: "gay"
                },
                {
                    name: "sexy",
                    value: "sexy"
                },
                {
                    name: "smart",
                    value: "smart"
                }
            )
    )
    .addStringOption((option) =>
        option
            .setName("victim")
            .setDescription("Who you want to measure")
            .setRequired(true)
    )

export { how, howCmd }