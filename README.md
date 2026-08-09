# EmixFG - Ultimate Discord Bot

**EmixFG** is a powerful, feature-rich Discord bot designed to enhance your server experience with comprehensive moderation tools, an engaging economy system, music, tickets, and much more. Built with modern Discord.js v14.

[![Support Server](https://img.shields.io/badge/-Support%20Server-%235865F2?logo=discord&logoColor=white&style=flat-square&logoWidth=20)](https://discord.gg/ATsbjzM9vB)
[![Discord.js](https://img.shields.io/npm/v/discord.js?style=flat-square&labelColor=%23202225&color=%23202225&logo=npm&logoColor=white&logoWidth=20)](https://www.npmjs.com/package/discord.js)

## Table of Contents

- [Features Overview](#features-overview)
- [Setup](#setup)
- [Required Bot Intents](#bot-intents)
- [License](#license)

<a name="features-overview"></a>
## Features Overview

<table>
<tr>
<td width="50%" valign="top">

### Moderation & Administration
- **Mass Actions** - Bulk ban/kick capabilities
- **User Notes** - Keep detailed moderation records
- **Case Management** - View and track all mod actions

### Economy System
- **Shop & Inventory** - Buy and manage items
- **Gambling** - Risk it for rewards
- **Pay System** - Transfer money between users

### Fun & Entertainment
- **Counting Game** - Server counting with leaderboard
- **Fight** - Simulated 1v1 text battles
- **Dice & Coins** - Roll dice, flip coins

### Advanced Ticket System
- **Claim & Priority** - Staff ticket management
- **Ticket Limits** - Prevent spam
- **Transcript System** - Save ticket history

### Server Stats
- **Member Counter** - Live member count channels
- **Voice Counters** - Track voice stats
- **Dynamic Updates** - Real-time channel updates

### Reaction Roles
- **Role Assignment** - Self-assignable roles
- **Emoji Selection** - Reaction-based system
- **Multi-role Support** - Multiple role options

</td>
<td width="50%" valign="top">

### Leveling & XP System
- **XP Tracking** - Automatic message-based XP
- **Level Roles** - Auto-assign roles by level
- **Custom Configuration** - Personalize leveling

### Giveaways & Events
- **Multiple Winners** - Support multi-winner giveaways
- **Auto Picking** - Automatic winner selection
- **Reroll System** - Pick new winners if needed

### Birthday System
- **Birthday Tracking** - Never miss a birthday
- **Auto Announcements** - Celebrate automatically

### Utility Tools
- **Report System** - Report issues to staff
- **Todo Lists** - Personal task management
- **First Message** - Jump to channel's first message

### Welcome System
- **Welcome Messages** - Greet new members
- **Auto Roles** - Assign roles on join
- **Custom Embeds** - Personalized messages

### Music
- **24/7 Mode** - Play music 24/7
- **Interactive Button System** - Manage music through buttons
- **Supports Every Platform** - Spotify, Deezer, YouTube, Apple Music

</td>
</tr>
</table>

<a name="setup"></a>
## Setup

**➡️ Read the [SETUP_GUIDE.md](SETUP_GUIDE.md) — a beginner-friendly, working 10-minute setup with all steps, all commands, all features, and the required intents & permissions.**

In short: install Node.js 20.10+, download the files, run `npm install`, paste your `DISCORD_TOKEN` and `CLIENT_ID` into a `.env` file (copy `.env.example`), turn on the two privileged intents in the Developer Portal, invite the bot, then run `npm run deploy:guild` and `npm start`.

### Docker (optional, advanced)

The bot is also fully containerized:

```bash
cp .env.example .env   # fill in DISCORD_TOKEN and CLIENT_ID
docker compose up -d --build
```

This starts the bot plus a PostgreSQL database (the bot without Docker also works fine without one, using memory storage).

### Music

Music works out of the box — the bot uses public Lavalink v4 nodes listed in `lavalink/nodes.json`. You can add or remove nodes in that file, or set `LAVALINK_NODES` / `LAVALINK_HOST` / `LAVALINK_PORT` / `LAVALINK_PASSWORD` in `.env` for a self-hosted node.

<a name="bot-intents"></a>
## Required Bot Intents

EmixFG requires the following Discord intents (the two privileged ones must be enabled in the Developer Portal):

- **Guilds**
- **Guild Members** (privileged — toggle ON)
- **Guild Messages**
- **Message Content** (privileged — toggle ON)
- **Guild Message Reactions**
- **Guild Voice States**
- **Guild Bans**
- **Direct Messages**

### Required Permissions

- **View Channels**
- **Send Messages**
- **Embed Links**
- **Attach Files**
- **Read Message History**
- **Manage Messages**
- **Manage Channels**
- **Manage Roles**
- **Kick Members**
- **Ban Members**
- **Moderate Members**
- **Connect**
- **Speak**

## License

EmixFG is released under the MIT License. See [LICENSE](LICENSE) for details.

## Thank You

Thank you for choosing EmixFG for your Discord server! We're constantly working to improve and add new features based on community feedback.
