require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '!ticket') {
    // Check if user already has a ticket
    const existingChannel = message.guild.channels.cache.find(ch => ch.name === `ticket-${message.author.id}`);
    if (existingChannel) {
      return message.reply('You already have an open ticket!');
    }

    // Create ticket channel
    const ticketChannel = await message.guild.channels.create({
      name: `ticket-${message.author.id}`,
      type: 0, // GUILD_TEXT
      permissionOverwrites: [
        {
          id: message.guild.id, // @everyone
          deny: ['ViewChannel'],
        },
        {
          id: message.author.id,
          allow: ['ViewChannel', 'SendMessages'],
        },
        // Add staff role if exists, assume role name 'Staff'
        {
          id: message.guild.roles.cache.find(role => role.name === 'Staff')?.id || message.guild.ownerId,
          allow: ['ViewChannel', 'SendMessages'],
        },
      ],
    });

    ticketChannel.send(`Hello ${message.author}, a staff member will assist you soon.`);
    message.reply(`Your ticket has been created: ${ticketChannel}`);
  }

  if (message.content.toLowerCase() === '!close' && message.channel.name.startsWith('ticket-')) {
    // Check if user is ticket owner or staff
    const ticketOwnerId = message.channel.name.split('-')[1];
    if (message.author.id === ticketOwnerId || message.member.permissions.has('MANAGE_CHANNELS')) {
      message.channel.send('Ticket will be closed in 5 seconds.');
      setTimeout(() => {
        message.channel.delete();
      }, 5000);
    } else {
      message.reply('You cannot close this ticket.');
    }
  }
});

client.login(process.env.TOKEN);