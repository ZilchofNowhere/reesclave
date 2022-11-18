import { SlashCommandBuilder } from "discord.js";

/**
 * Order some food
 * @param {import "discord.js".Interaction<import("discord.js").CacheType>} interaction
 */
function order(interaction) {
    const food = interaction.options.getString("food").value
    const drink = interaction.options.getString("drink").value
    interaction.reply(`You ordered ${food} and ${drink}.`)
}

const orderCmd = new SlashCommandBuilder()
    .setName("order")
    .setDescription("Order some food!")
    .addStringOption((option) => //! braces cause this to crash???
        option
            .setName("food")
            .setDescription("Select what you want to eat")
            .setRequired(true)
            .addChoices(
                {
                    name: "Cake",
                    value: "cake",
                    description: "Cake"
                }, {
                    name: "Hamburger",
                    value: "hamburger",
                    description: "Hamburger"
                }, {
                    name: "Pizza",
                    description: "Pizza",
                    value: "pizza"
                }
            )
    )
    .addStringOption((option) => //! braces cause this to crash???
        option
            .setName("drink")
            .setDescription("Select something to drink along")
            .setRequired(true)
            .addChoices(
                {
                    name: "Water",
                    value: "water",
                    description: "Water"
                }, {
                    name: "Coke",
                    value: "coke",
                    description: "Coke"
                }, {
                    name: "Tea",
                    description: "Tea",
                    value: "tea"
                }
            )
    )

export { order, orderCmd }