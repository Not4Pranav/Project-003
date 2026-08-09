import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { REST, Routes } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAllFiles(dir) {
  const files = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function getCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = await getAllFiles(commandsPath);

  for (const filePath of commandFiles) {
    try {
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      const { default: command } = await import(fileUrl);
      if (command?.data) {
        commands.push(command.data.toJSON());
      }
    } catch (error) {
      console.error(`[Deploy] Skipped ${filePath}:`, error.message);
    }
  }
  return commands;
}

async function deploy(guild) {
  // Simple checks with beginner-friendly messages
  if (!process.env.DISCORD_TOKEN) {
    console.error('[Deploy] ❌ DISCORD_TOKEN missing in .env - copy it from Discord Developer Portal > Bot > Token');
    process.exit(1);
  }
  if (!process.env.CLIENT_ID) {
    console.error('[Deploy] ❌ CLIENT_ID missing in .env - copy it from Discord Developer Portal > General Information > Application ID');
    process.exit(1);
  }

  const commands = await getCommands();
  if (commands.length === 0) {
    console.error('[Deploy] ❌ No commands found');
    process.exit(1);
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  if (guild) {
    if (!process.env.GUILD_ID) {
      console.error('[Deploy] ❌ GUILD_ID is empty in .env - add your server ID for --guild deploy, or use --global');
      console.error('   To get GUILD_ID: Enable Developer Mode in Discord (Settings > Advanced) > Right click server icon > Copy ID');
      process.exit(1);
    }
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log(`[Deploy] ✅ Deployed ${commands.length} commands to your server (instant)`);
  } else {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log(`[Deploy] ✅ Deployed ${commands.length} commands globally (may take up to 1 hour to appear)`);
  }
}

const args = process.argv.slice(2);
const guildDeploy = args.includes('--guild');
deploy(guildDeploy).catch((e) => {
  console.error('[Deploy] ❌ Failed:', e.message);
  process.exit(1);
});
