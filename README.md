# Discord Ticket Bot

A simple Discord bot for creating and managing support tickets.

## Setup

1. Create a Discord bot at https://discord.com/developers/applications
2. Copy the bot token and paste it in `.env` as `TOKEN=your_token`
3. Invite the bot to your server with appropriate permissions (Manage Channels, Send Messages, View Channels, etc.)
4. Run `npm install`
5. Run `node index.js`

## Usage

- `!ticket` - Create a new ticket (creates a private channel)
- `!close` - Close the ticket (only in ticket channels, by ticket owner or staff with MANAGE_CHANNELS permission)

## Notes

- Assumes a role named 'Staff' for staff permissions. Adjust the code if your role name differs.
- Tickets are named `ticket-{user_id}` to avoid duplicates.