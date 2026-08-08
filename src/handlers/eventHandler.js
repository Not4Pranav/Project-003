import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client) {
  const eventsPath = path.join(__dirname, '../events');
  const eventFiles = await getAllFiles(eventsPath);
  
  for (const filePath of eventFiles) {
    try {
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      const { default: event } = await import(fileUrl);
      
      if (event?.name && event?.execute) {
        const isOnce = event.once || false;
        if (isOnce) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client));
        }
      }
    } catch (error) {
      console.error(`[EmixFG] Error loading event ${filePath}:`, error);
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
