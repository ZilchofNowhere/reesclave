import { SlashCommandBuilder } from 'discord.js'

/**
 * Changes someone's nick
 * @param {import 'discord.js'.Interaction<import('discord.js').CacheType>} interaction
*/
function setNick(interaction) {
    const victim = interaction.options.getUser("victim")
    const newNick = interaction.options.getString("nick")

    interaction.guild.members.search({ query: victim.tag })
        .then((user) => user.at(0).setNickname(newNick))
        .catch(() => console.log("An error occurred changing the nick."))
        
    interaction.reply({
        content: `Changed ${victim.username}'s nickname to ${newNick}.`,
        ephemeral: true
    })
}

const setNickCmd = new SlashCommandBuilder()
    .setName('setnick')
    .setDescription("Change each other's nicks")
    .addUserOption((option) =>
        option
            .setName("victim")
            .setDescription("User to have their nick changed")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("nick")
            .setDescription("The new nick")
            .setRequired(true)
    )

export { setNick, setNickCmd }