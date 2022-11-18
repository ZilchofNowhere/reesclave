import { SlashCommandBuilder } from 'discord.js'

/**
 * Deletes messages from a channel.
 * @param {import 'discord.js'.Interaction<import('discord.js').CacheType>} interaction
*/
function deleteMsg(interaction) {
    const number = interaction.options.getInteger("number")

    interaction.channel.bulkDelete(number)
    interaction.reply({
        content: `Deleted ${number} messages.`,
        ephemeral: true
    })
}

const deleteMsgCmd = new SlashCommandBuilder()
    .setName('delete')
    .setDescription("Deletes messages from a channel.")
    .addIntegerOption((option) =>
        option
            .setName("number")
            .setDescription("Number of messages to be deleted")
            .setRequired(true)
            .setMinValue(1)
    )

export { deleteMsg, deleteMsgCmd }