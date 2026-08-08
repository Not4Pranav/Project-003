import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      console.error(`Error loading command ${filePath}:`, error);
    }
  }
  
  return commands;
}

async function getAllFiles(dir) {
  const files = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function deploy(guild) {
  const commands = await getCommands();
  if (commands.length === 0) {
    console.error('No commands found');
    process.exit(1);
  }
  
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  
  if (guild) {
    if (!process.env.GUILD_ID) {
      console.error('GUILD_ID is required for guild deployment');
      process.exit(1);
    }
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log(`Deployed ${commands.length} commands to guild`);
  } else {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log(`Deployed ${commands.length} commands globally`);
  }
}

const args = process.argv.slice(2);
const guildDeploy = args.includes('--guild');
deploy(guildDeploy);

import fs from 'fs';
