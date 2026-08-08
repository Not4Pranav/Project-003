import path from 'path';
import { fileURLToPath } from 'url';
import { Collection } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client) {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = await getAllFiles(commandsPath);
  
  for (const filePath of commandFiles) {
    try {
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      const { default: command } = await import(fileUrl);
      
      if (command?.data?.name && command?.execute) {
        client.commands.set(command.data.name, command);
      }
    } catch (error) {
      console.error(`[EmixFG] Error loading command ${filePath}:`, error);
    }
  }
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

import fs from 'fs';
