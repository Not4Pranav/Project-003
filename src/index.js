/**
 * EmixFG Discord Bot - Simple Entry Point
 * Just set your .env and run npm start - that's it!
 */

import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';

// --- Check required values before starting (beginner-friendly errors) ---
if (!process.env.DISCORD_TOKEN) {
  console.error('');
  console.error('❌ DISCORD_TOKEN is missing!');
  console.error('   Fix: Open .env and paste your bot token');
  console.error('   Get it from: https://discord.com/developers/applications > Your App > Bot > Reset Token > Copy');
  console.error('');
  process.exit(1);
}
if (!process.env.CLIENT_ID) {
  console.error('');
  console.error('❌ CLIENT_ID is missing!');
  console.error('   Fix: Open .env and paste your Application ID');
  console.error('   Get it from: https://discord.com/developers/applications > Your App > General Information > Application ID');
  console.error('');
  process.exit(1);
}

// Create client with required intents (do not change)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
  ],
});

// Collections for handlers
client.commands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.cooldowns = new Collection();

// Load config (reads from .env)
import config from './config.js';
client.config = config;

// Handlers
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

// Start bot
(async () => {
  try {
    console.log('[EmixFG] 🚀 Starting bot...');

    console.log('[EmixFG] 📂 Loading commands...');
    await loadCommands(client);
    console.log(`[EmixFG] ✅ Loaded ${client.commands.size} commands`);

    console.log('[EmixFG] 📂 Loading events...');
    await loadEvents(client);
    console.log(`[EmixFG] ✅ Loaded ${client.events.size} events`);

    console.log('[EmixFG] 🔧 Initializing services...');
    try {
      const { initializeDatabase } = await import('./utils/database.js');
      const db = await initializeDatabase();
      client.db = db.db;
      console.log('[EmixFG] ✅ Database ready');
    } catch {
      console.log('[EmixFG] ⚠️ Database not available, using memory (data resets on restart)');
    }

    try {
      const { initializeMusic } = await import('./services/music/riffySetup.js');
      initializeMusic(client);
      console.log('[EmixFG] ✅ Music system ready');
    } catch {
      console.log('[EmixFG] ⚠️ Music system not available (optional)');
    }

    console.log('[EmixFG] 🔌 Logging into Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    console.log('[EmixFG] 🎉 Bot is ONLINE! Go to Discord and try /ping');
  } catch (error) {
    console.error('[EmixFG] ❌ Failed to start:', error.message);
    process.exit(1);
  }
})();

process.on('SIGINT', async () => {
  console.log('[EmixFG] 🛑 Shutting down...');
  await client.destroy();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('[EmixFG] ❌ Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (error) => {
  console.error('[EmixFG] ❌ Unhandled Rejection:', error?.message || error);
});

export default client;
