/**
 * EmixFG Discord Bot
 * Main entry point - Simple and clean structure
 */

import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create client
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

// Client properties
client.commands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.cooldowns = new Collection();

// Load configuration
import config from './config.js';
client.config = config;

// Load handlers
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

// Initialize
(async () => {
  try {
    console.log('[EmixFG] 🚀 Starting bot...');
    
    // Load commands
    console.log('[EmixFG] 📂 Loading commands...');
    await loadCommands(client);
    console.log(`[EmixFG] ✅ Loaded ${client.commands.size} commands`);
    
    // Load events
    console.log('[EmixFG] 📂 Loading events...');
    await loadEvents(client);
    console.log(`[EmixFG] ✅ Loaded ${client.events.size} events`);
    
    // Initialize services
    console.log('[EmixFG] 🔧 Initializing services...');
    try {
      const { initializeDatabase } = await import('./utils/database.js');
      const db = await initializeDatabase();
      client.db = db.db;
      console.log('[EmixFG] ✅ Database initialized');
    } catch (dbError) {
      console.log('[EmixFG] ⚠️ Database not available, using fallback');
    }
    
    try {
      const { initializeMusic } = await import('./services/music/riffySetup.js');
      initializeMusic(client);
      console.log('[EmixFG] ✅ Music system initialized');
    } catch (musicError) {
      console.log('[EmixFG] ⚠️ Music system not available');
    }
    
    // Login
    console.log('[EmixFG] 🔌 Logging into Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    console.log('[EmixFG] 🎉 Bot is online!');
  } catch (error) {
    console.error('[EmixFG] ❌ Error:', error);
    process.exit(1);
  }
})();

// Handle process termination
process.on('SIGINT', async () => {
  console.log('[EmixFG] 🛑 Shutting down...');
  await client.destroy();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('[EmixFG] ❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('[EmixFG] ❌ Unhandled Rejection:', error);
});

export default client;
