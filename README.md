# Discord Bot 1.0.0

This Discord bot logs various server events such as member joins, member leaves, message updates, role changes, and more. The logs are sent to specific channels defined in the `config.json` file.

## Prerequisites

- [Node.js](https://nodejs.org/en/) v16.6.0 or higher
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)

## Installation

1. Clone the repository or download the code.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required packages:
    ```sh
    npm install discord.js
    ```

## Configuration

1. Create a `config.json` file in the root directory of the project with the following structure:
    ```json
    {
        "token": "YOUR_BOT_TOKEN",
        "logChannels": {
            "guildMemberAdd": "CHANNEL_ID",
            "guildMemberRemove": "CHANNEL_ID",
            "messageCreate": "CHANNEL_ID",
            "messageUpdate": "CHANNEL_ID",
            "messageDelete": "CHANNEL_ID",
            "roleCreate": "CHANNEL_ID",
            "roleUpdate": "CHANNEL_ID",
            "roleDelete": "CHANNEL_ID",
            "channelCreate": "CHANNEL_ID",
            "channelUpdate": "CHANNEL_ID",
            "channelDelete": "CHANNEL_ID",
            "guildBanAdd": "CHANNEL_ID",
            "guildBanRemove": "CHANNEL_ID",
            "guildMemberUpdate": "CHANNEL_ID",
            "voiceStateUpdate": "CHANNEL_ID"
        }
    }
    ```
2. Replace `YOUR_BOT_TOKEN` with your bot's token.
3. Replace `CHANNEL_ID` with the IDs of the channels where you want the logs to be sent.

## Running the Bot

1. In the terminal, run the following command to start the bot:
    ```sh
    node bot.js
    ```

You should see a message in the terminal saying `Logged in as [Your Bot's Username]`.

## Event Logging

The bot logs the following events:

- **Member Joins**: Logs when a member joins the server.
- **Member Leaves**: Logs when a member leaves the server.
- **Message Sent**: Logs when a new message is sent.
- **Message Edited**: Logs when a message is edited.
- **Message Deleted**: Logs when a message is deleted.
- **Role Created**: Logs when a new role is created.
- **Role Updated**: Logs when a role is updated.
- **Role Deleted**: Logs when a role is deleted.
- **Channel Created**: Logs when a new channel is created.
- **Channel Updated**: Logs when a channel is updated.
- **Channel Deleted**: Logs when a channel is deleted.
- **User Banned**: Logs when a user is banned.
- **User Unbanned**: Logs when a user is unbanned.
- **Nickname Changed**: Logs when a member's nickname is changed.
- **Role Added/Removed**: Logs when roles are added or removed from a member.
- **Voice Channel Update**: Logs when a member moves between voice channels.
- **Voice State Update**: Logs when a member is muted or deafened.

## Functionality

The main functionality of the bot is handled by the event listeners in the `bot.js` file. When an event occurs, an embed message is created and sent to the appropriate logging channel.

## Troubleshooting

- Ensure your bot's token is correct and your bot is invited to the server with the necessary permissions.
- Ensure the channel IDs in `config.json` are correct.
- Check the terminal for any error messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
