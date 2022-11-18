import { config } from "dotenv"; config();
import { Client, Routes } from "discord.js"
import { REST } from "@discordjs/rest"
//* commands
import { beep, beepCmd } from "./commands/beep.js" // throws an error without the file extension
import { order, orderCmd } from "./commands/order.js"
import { setNick, setNickCmd } from "./commands/setNick.js";
import { how, howCmd } from "./commands/how.js";
import { deleteMsg, deleteMsgCmd } from "./commands/delete.js";

//* constants
const TOKEN = process.env.DC_BOT_TOKEN
const CLIENT_ID = process.env.DC_CLIENT_ID
const GUILD_ID = process.env.DEV_GUILD_ID

const client = new Client({
    // all intents are included here
    intents: [
        'AutoModerationConfiguration', 'AutoModerationExecution', 'DirectMessageReactions', 'DirectMessageTyping',
        'DirectMessages', 'GuildBans', 'GuildEmojisAndStickers', 'GuildIntegrations', 'GuildInvites', 'GuildMembers',
        'GuildMessageReactions', 'GuildMessageTyping', 'GuildMessages', 'GuildPresences', 'GuildScheduledEvents',
        'GuildVoiceStates', 'Guilds', 'MessageContent', 'GuildWebhooks'
    ]
    //? GuildMembers, GuildPresences, MessageContent are privileged and need to be explicitly permitted thru the dev portal,
    //? also cant have them after 100 servers without verification
})

const rest = new REST({ version: '10' }).setToken(TOKEN)

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() == "ping") {
        message.channel.send("Pong!")
    }
})

client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case "beep": 
                beep(interaction)
                break

            case "order":
                order(interaction)
                break

            case "setnick":
                setNick(interaction)
                break

            case "how":
                how(interaction)
                break

            case "delete":
                deleteMsg(interaction)
                break
        }
    }
})

async function main() {
    //* commands
    const commands = [
        beepCmd.toJSON(),
        orderCmd.toJSON(),
        setNickCmd.toJSON(),
        howCmd.toJSON(),
        deleteMsgCmd.toJSON()
    ]

    try {
        console.log("Started refreshing application (/) commands.");
        //* registers commands to the dev server
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands
        })

        //* registers commands to the universe
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        })

        //* login
        client.login(TOKEN)

    } catch (err) {
        console.log("An error occurred.");
        console.log(`Error: ${err}`)
    }
}

main()