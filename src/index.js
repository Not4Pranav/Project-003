/**
 * EmixFG Discord Bot - Simple Entry Point
 * ========================================
 * You do NOT need to edit this file.
 * Just fill in the .env file and run: npm start
 *
 * What happens when you run it:
 *   1. Checks your .env has the 2 required values
 *   2. Loads all commands, events, buttons, menus and forms
 *   3. Starts the database (PostgreSQL if set up, memory otherwise)
 *   4. Starts the music system and auto tasks (giveaways, birthdays, counters)
 *   5. Logs into Discord - done!
 */

import 'dotenv/config';

// ============================================
// STEP 0 - Check the 2 required values first
// (friendly error instead of a scary crash)
// ============================================
if (!process.env.DISCORD_TOKEN) {
  console.error('');
  console.error('❌ DISCORD_TOKEN is missing!');
  console.error('   Fix: Open the .env file and paste your bot token next to DISCORD_TOKEN=');
  console.error('   Get it from: https://discord.com/developers/applications > Your App > Bot > Reset Token > Copy');
  console.error('');
  process.exit(1);
}
if (!process.env.CLIENT_ID) {
  console.error('');
  console.error('❌ CLIENT_ID is missing!');
  console.error('   Fix: Open the .env file and paste your Application ID next to CLIENT_ID=');
  console.error('   Get it from: https://discord.com/developers/applications > Your App > General Information > Application ID');
  console.error('');
  process.exit(1);
}

// Heavy modules are imported dynamically so the checks above
// always run first (cleaner errors for beginners).
const http = await import('node:http');
const cron = (await import('node-cron')).default;
const { Client, GatewayIntentBits, Collection } = await import('discord.js');
const { default: config } = await import('./config.js');
const { loadCommands } = await import('./handlers/commandHandler.js');
const { loadEvents } = await import('./handlers/eventHandler.js');
const { default: loadInteractions } = await import('./handlers/loaders/interactions.js');
const { logger, startupLog } = await import('./utils/logger.js');
const { runSafeTask } = await import('./utils/errorHandler.js');

// ============================================
// Create the Discord client
// (these intents are required and must also be turned
//  ON in the Developer Portal - see the setup guide)
// ============================================
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

// Storage used by the bot's systems
client.commands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.cooldowns = new Collection();
client.config = config;

// ============================================
// Tiny health-check web server (optional)
// Useful for hosting platforms (Railway, Docker...).
// The bot works fine even if this is skipped.
// ============================================
function startHealthServer() {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.WEB_HOST || '0.0.0.0';

  const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/' || req.url === '/ready') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'ok',
          online: client.isReady(),
          uptime: Math.floor(process.uptime()),
        }),
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.on('error', () => {
    console.log(`[EmixFG] ⚠️ Port ${port} is busy - health server skipped (bot still works)`);
  });

  server.listen(port, host, () => {
    console.log(`[EmixFG] 🌐 Health check server running on ${host}:${port}`);
  });

  return server;
}

// ============================================
// Auto tasks running in the background:
// - giveaways: check endings every minute
// - birthdays: announce every day at 06:00
// - server stat counters: refresh every 15 min
// ============================================
function startAutoTasks() {
  cron.schedule(
    '* * * * *',
    runSafeTask('giveaway_check', async () => {
      const { checkGiveaways } = await import('./services/giveawayService.js');
      await checkGiveaways(client);
    }),
  );

  cron.schedule(
    '0 6 * * *',
    runSafeTask('birthday_check', async () => {
      const { checkBirthdays } = await import('./services/birthdayService.js');
      await checkBirthdays(client);
    }),
  );

  cron.schedule(
    '*/15 * * * *',
    runSafeTask('counter_update', async () => {
      await updateAllCounters();
    }),
  );
}

async function updateAllCounters() {
  if (!client.db) return;

  const { getServerCounters, saveServerCounters, updateCounter } = await import(
    './services/serverstatsService.js'
  );

  for (const [guildId, guild] of client.guilds.cache) {
    try {
      const counters = await getServerCounters(client, guildId);
      const validCounters = [];
      const orphanedCounters = [];

      for (const counter of counters) {
        if (counter && counter.type && counter.channelId && counter.enabled !== false) {
          const channel = guild.channels.cache.get(counter.channelId);
          if (channel) {
            validCounters.push(counter);
            await updateCounter(client, guild, counter);
          } else {
            orphanedCounters.push(counter);
          }
        }
      }

      if (orphanedCounters.length > 0) {
        await saveServerCounters(client, guildId, validCounters);
      }
    } catch (error) {
      logger.warn(`[EmixFG] Counter update failed for guild ${guildId}: ${error.message}`);
    }
  }
}

// ============================================
// Start everything
// ============================================
(async () => {
  try {
    console.log('[EmixFG] 🚀 Starting bot...');

    console.log('[EmixFG] 📂 Loading commands...');
    await loadCommands(client);
    console.log(`[EmixFG] ✅ Loaded ${client.commands.size} commands`);

    console.log('[EmixFG] 📂 Loading events...');
    await loadEvents(client);
    console.log(`[EmixFG] ✅ Loaded ${client.events.size} events`);

    console.log('[EmixFG] 📂 Loading buttons, menus and forms...');
    await loadInteractions(client);
    console.log(
      `[EmixFG] ✅ Loaded ${client.buttons.size} buttons, ${client.selectMenus.size} menus, ${client.modals.size} forms`,
    );

    console.log('[EmixFG] 💾 Starting database...');
    try {
      const { initializeDatabase } = await import('./utils/database.js');
      const { db } = await initializeDatabase();
      client.db = db;
      const status = typeof db.getStatus === 'function' ? db.getStatus() : null;
      if (status?.isDegraded) {
        console.log('[EmixFG] ⚠️ No PostgreSQL found - using memory (data resets when bot restarts)');
      } else {
        console.log('[EmixFG] ✅ Database ready (PostgreSQL - data is saved permanently)');
      }
    } catch (error) {
      console.log('[EmixFG] ⚠️ Database not available, using memory (data resets when bot restarts)');
    }

    console.log('[EmixFG] 🎵 Starting music system...');
    try {
      const { initializeMusic } = await import('./services/music/riffySetup.js');
      initializeMusic(client);
      console.log('[EmixFG] ✅ Music system ready');
    } catch {
      console.log('[EmixFG] ⚠️ Music system not available (optional - everything else still works)');
    }

    startHealthServer();
    startAutoTasks();

    console.log('[EmixFG] 🔌 Logging into Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    startupLog(`Logged in as ${client.user?.tag}`);
    console.log('[EmixFG] 🎉 Bot is ONLINE! Go to Discord and try /ping');
  } catch (error) {
    const message = String(error?.message || '');
    if (message.includes('invalid token') || message.includes('Invalid Token') || error?.code === 'TokenInvalid') {
      console.error('');
      console.error('❌ Your DISCORD_TOKEN is wrong. Copy it again carefully:');
      console.error('   https://discord.com/developers/applications > Your App > Bot > Reset Token > Copy');
      console.error('');
    } else if (message.includes('disallowed intent') || message.includes('DisallowedIntents') || error?.code === 'DisallowedIntents') {
      console.error('');
      console.error('❌ Privileged intents are not turned ON!');
      console.error('   Fix: https://discord.com/developers/applications > Your App > Bot');
      console.error('   Turn ON "Server Members Intent" and "Message Content Intent", then Save Changes.');
      console.error('');
    } else {
      console.error('[EmixFG] ❌ Failed to start:', error.message);
    }
    process.exit(1);
  }
})();

// Graceful stop with Ctrl + C
async function shutdown() {
  console.log('[EmixFG] 🛑 Shutting down...');
  await client.destroy();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('uncaughtException', (error) => {
  console.error('[EmixFG] ❌ Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (error) => {
  console.error('[EmixFG] ❌ Unhandled Rejection:', error?.message || error);
});

export default client;
