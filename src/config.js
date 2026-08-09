import 'dotenv/config';

// ============================================
// EmixFG - Simple Config (Beginner Friendly)
// ============================================
// This is the ONLY file you need to understand.
// All values come from your .env file.
// Just edit .env and restart the bot - no code changes needed!
// ============================================

export const config = {
  // Your bot token (from Discord Developer Portal)
  token: process.env.DISCORD_TOKEN,

  // Your bot's Application ID (Client ID)
  clientId: process.env.CLIENT_ID,

  // Your server ID (optional - for instant commands in one server)
  guildId: process.env.GUILD_ID || null,

  // Command prefix like !ping (default: !)
  prefix: process.env.PREFIX || "!",

  // These intents are required - DO NOT CHANGE
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildMessageReactions",
    "MessageContent",
    "DirectMessages",
    "GuildVoiceStates",
    "GuildBans",
  ],
};

export default config;
