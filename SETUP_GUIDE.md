# EmixFG Discord Bot — Easy Setup Guide

> Beginner friendly. Download, paste 2 values, run 2 commands — bot is online in 10 minutes.

---

## 1. Requirements

| Need | Details |
|------|---------|
| **Node.js** | Version 20.10.0 or higher — download from https://nodejs.org |
| **Discord Account** | To create the bot at https://discord.com/developers/applications |
| **A Discord Server** | Where you have **Administrator** permission to invite the bot |

Check Node.js is installed:
```bash
node -v
# should show v20.10.0 or higher
```

---

## 2. Very Easy Setup Guide — Whole Setup (10 Minutes, Working)

Follow exactly in order. No step is optional.

### STEP 1 — Download the files (1 min)

```bash
git clone https://github.com/Not4Pranav/Project-003.git
cd Project-003
```

> No git? Click **Code > Download ZIP** on GitHub, unzip, then open terminal inside the folder.

### STEP 2 — Create your Discord Bot (2 min)

1. Go to **https://discord.com/developers/applications** and log in
2. Click **New Application** > name it `EmixFG` > **Create**
3. Go to **Bot** on the left > Click **Reset Token** > **Copy** → this is your `DISCORD_TOKEN`
4. Go to **General Information** on the left > Copy **Application ID** → this is your `CLIENT_ID`
5. Keep this tab open, you need both values in next step

### STEP 3 — Configure the bot (1 min)

```bash
npm install
cp .env.example .env
```

Now open `.env` in any text editor (Notepad, VS Code, `nano .env`) and paste:

```env
DISCORD_TOKEN= paste_your_bot_token_here
CLIENT_ID= paste_your_application_id_here
```

**Optional but recommended for faster testing:**
- Turn on **Developer Mode** in Discord: Settings > Advanced > Developer Mode = ON
- Right-click your **server icon** > Copy ID → paste as `GUILD_ID=your_server_id`
- Right-click your **profile** > Copy ID → paste as `OWNER_IDS=your_user_id`

Leave `PREFIX=!` as is. Save the file.

> That's the ONLY file you ever need to edit. No other config needed.

### STEP 4 — Enable Intents in Discord Portal (1 min)

Still at https://discord.com/developers/applications > Your App > **Bot** tab, scroll to **Privileged Gateway Intents** and turn ON:

- **Server Members Intent** → ON
- **Message Content Intent** → ON

Click **Save Changes**.

> These match the code intents, otherwise moderation, welcome and leveling won't work.

### STEP 5 — Invite the bot to your server (1 min)

1. In the same Developer Portal > **OAuth2 > URL Generator**
2. Tick scopes: `bot` + `applications.commands`
3. Tick permissions (or tick Administrator for testing):
   - View Channels, Send Messages, Embed Links, Attach Files, Read Message History, Manage Messages, Manage Channels, Manage Roles, Kick Members, Ban Members, Moderate Members, Connect, Speak
4. Copy the generated URL at the bottom, open it in browser, pick your server, **Authorize**

### STEP 6 — Deploy commands (1 min)

Choose ONE:

```bash
# Instant (recommended) — commands appear immediately in your server
# Requires GUILD_ID set in .env
npm run deploy:guild

# Or Global — works in every server you invite the bot to (takes up to 1 hour)
npm run deploy:global
```

You should see: `✅ Deployed XX commands`

### STEP 7 — Start the bot (1 min)

```bash
npm start
```

You should see:
```
[EmixFG] 🚀 Starting bot...
[EmixFG] ✅ Loaded XX commands
[EmixFG] ✅ Loaded XX events
[EmixFG] 🎉 Bot is ONLINE! Go to Discord and try /ping
```

Go to Discord, type `/ping` — if it replies, you are done!

**Keep it running:** Don't close the terminal. For 24/7 hosting, use a VPS, Railway, or keep your PC on. To stop: press `Ctrl + C`.

### If something fails

| Error | Fix |
|-------|-----|
| `DISCORD_TOKEN is missing` | You didn't paste token in `.env` — copy again from Bot tab |
| `CLIENT_ID is missing` | You didn't paste Application ID in `.env` |
| `GUILD_ID is empty` for deploy:guild | Either set `GUILD_ID` or use `npm run deploy:global` |
| Bot is offline in Discord | Check token is correct, run `npm start` again |
| Commands don't show | Wait 1 hour for global deploy, or use `deploy:guild` with correct GUILD_ID and re-invite with `applications.commands` scope |
| No permission to kick/ban | You invited without permissions — re-do Step 5 and tick the permissions |

---

## 3. All Commands

All commands are slash commands (`/`). Just type `/` in Discord to see them.

### Core
| Command | What it does |
|---------|--------------|
| `/ping` | Check bot latency |
| `/help` | Show help menu |
| `/commands dashboard` | Commands control panel |
| `/stats` | Bot statistics (servers, users, uptime) |
| `/support` | Support server link |
| `/uptime` | How long bot has been online |
| `/configwizard` | Step-by-step server setup wizard |

### Moderation
| Command | What it does |
|---------|--------------|
| `/warn user reason` | Warn a user |
| `/warnings user` | View warnings for a user |
| `/cases` | View all moderation cases |
| `/kick user reason` | Kick a user |
| `/ban user reason` | Ban a user |
| `/unban user_id` | Unban by ID |
| `/massban users reason` | Ban multiple users at once |
| `/masskick users reason` | Kick multiple users at once |
| `/timeout user duration reason` | Timeout / mute a user |
| `/untimeout user` | Remove timeout |
| `/purge amount` | Delete X messages |
| `/lock channel` | Lock a channel |
| `/unlock channel` | Unlock a channel |
| `/say channel message` | Send message as bot |
| `/dm user message` | DM a user via bot |
| `/usernotes user` | Add / view / remove notes on a user |

### Economy
| Command | What it does |
|---------|--------------|
| `/balance` / `/economy` | Check balance |
| `/daily` | Claim daily reward (100 coins) |
| `/work` | Work for 10–100 coins |
| `/beg` | Beg for 5–50 coins |
| `/crime` | Crime for coins (risk) |
| `/slut` | Slut command for coins |
| `/rob user` | Rob another user |
| `/pay user amount` | Send coins to someone |
| `/deposit amount` | Deposit to bank |
| `/withdraw amount` | Withdraw from bank |
| `/shop` | View shop |
| `/buy item_id quantity` | Buy item |
| `/shop-config` | Configure shop (setrole etc.) |
| `/inventory` | View your items |
| `/eleaderboard` | Economy leaderboard |
| `/fish` | Go fishing for coins |
| `/mine` | Mine for coins |
| `/gamble amount` | Gamble coins |
| Text prefix `!` also works for economy | Alternative to slash |

### Fun
| Command | What it does |
|---------|--------------|
| `/count` | Counting game (status / leaderboard / disable) |
| `/fight opponent` | Fight another user |
| `/flip text` | Flip text upside down |
| `/roll notation` | Roll dice (e.g. 2d20) |

### Giveaway
| Command | What it does |
|---------|--------------|
| `/gcreate duration winners prize channel` | Create giveaway |
| `/gend messageid` | End giveaway early |
| `/gdelete messageid` | Delete giveaway |
| `/greroll messageid` | Reroll winners |

### Join To Create (Temp Voice)
| Command | What it does |
|---------|--------------|
| `/jointocreate setup` | Setup join-to-create voice system |
| `/jointocreate config` | Configure it |

### Leveling
| Command | What it does |
|---------|--------------|
| `/rank user` | Check rank card |
| `/level` | Check your level / XP |
| `/leaderboard` | XP leaderboard |
| `/leveladd user amount` | Add XP to user |
| `/levelremove user amount` | Remove XP from user |
| `/levelset user level` | Set user level |
| `/levels config` | Leveling dashboard (enable, XP, channel, roles) |

### Logging
| Command | What it does |
|---------|--------------|
| `/logging dashboard` | Logging control panel |
| `/logging channel` | Set log channel |

### Music
| Command | What it does |
|---------|--------------|
| `/play query` | Play from YouTube / Spotify / SoundCloud etc. |
| `/join` | Join voice channel |
| `/queue` | View queue |
| `/nowplaying` | Current song |
| `/music play/pause/resume/skip/stop/volume/seek/loop/shuffle/queue` | Full music controls |

### Reaction Roles
| Command | What it does |
|---------|--------------|
| `/reactroles` | Setup self-assignable reaction roles |

### Search
| Command | What it does |
|---------|--------------|
| `/search google query` | Google search |
| `/search define word` | Define a word |
| `/search urban word` | Urban Dictionary |

### Server Stats
| Command | What it does |
|---------|--------------|
| `/serverstats create type channel` | Create counter channel (members / bots / members_only) |
| `/serverstats delete counter-id` | Delete counter |
| `/serverstats list` | List counters |
| `/serverstats update` | Force update counters |

### Ticket
| Command | What it does |
|---------|--------------|
| `/ticket` | Create ticket panel / settings |
| `/close` | Close ticket |
| `/claim` | Claim ticket (staff) |
| `/priority level` | Set ticket priority (low/medium/high/urgent) |

### Tools
| Command | What it does |
|---------|--------------|
| `/calculate expression` | Calculator |
| `/countdown seconds` | Countdown timer |
| `/embedbuilder` | Build custom embed |
| `/generatepassword length` | Generate password |
| `/hexcolor color` | Show hex color info |
| `/poll question options` | Create poll (up to 10 options) |
| `/randomuser` | Pick random server member |
| `/shorten url` | Shorten URL |
| `/time` | Current time |
| `/unixtime` | Unix timestamp |
| `/baseconvert number from to` | Convert number base |

### Utility
| Command | What it does |
|---------|--------------|
| `/avatar user` | Show avatar |
| `/serverinfo` | Server info |
| `/userinfo user` | User info |
| `/weather city` | Weather info |
| `/firstmsg channel` | Jump to first message in channel |
| `/report user reason` | Report a user to staff |
| `/todo` | Personal todo list (add/clear/complete/delete) |
| `/wipedata` | Wipe your data |

### Birthday
| Command | What it does |
|---------|--------------|
| `/birthday set month day` | Set your birthday |
| `/birthday remove user` | Remove birthday |
| `/birthday info user` | Check birthday |
| `/birthday list` | List all birthdays |
| `/birthday setchannel channel` | Set announcement channel |
| `/birthday next` | Next upcoming birthdays |

### Community / Applications
| Command | What it does |
|---------|--------------|
| `/apply` | Submit application |
| `/app-admin dashboard/setup/list/review` | Manage applications |

### Verification
| Command | What it does |
|---------|--------------|
| `/verify` | Create verification panel |
| `/verification` | Verification settings dashboard |
| `/autoverify` | Auto-verify settings |

### Welcome / Goodbye
| Command | What it does |
|---------|--------------|
| `/welcome` | Welcome system dashboard |
| `/greet` | Set welcome message/channel |
| `/goodbye` | Set goodbye message/channel |
| `/autorole role` | Set auto-role on join |

---

## 4. All Features

### Moderation & Admin
- Warn / kick / ban / unban / timeout / untimeout with reasons
- Mass ban & mass kick
- Purge (bulk delete), channel lock/unlock
- User notes and case management (view all mod actions)
- Warnings tracking

### Economy
- Full coin system with wallet + bank (deposit/withdraw)
- Daily reward, work, beg, crime, slut, rob, pay, fish, mine, gamble
- Shop with buyable items and inventory
- Shop role rewards (buy item → get role)
- Economy leaderboard

### Fun
- Counting game with leaderboard
- Fight, flip text, dice roll

### Ticket System
- Ticket panel creation, claim by staff, priority levels, close, transcript, archive

### Leveling & XP
- XP on every message, level up, rank card, leaderboard
- Custom XP per message, cooldown, level-up channel, level roles (auto-assign at level)

### Giveaways
- Create with duration + winners + prize, auto pick winners, end early, reroll, delete

### Birthday
- Set / remove / list birthdays, auto announcement channel, next birthdays, timezone aware

### Music
- Play from YouTube, Spotify, SoundCloud, Deezer, Apple Music via Lavalink
- Queue, now playing, pause/resume/skip/stop/volume/seek/loop/shuffle/247 mode, voice controls

### Search
- Google, define, Urban Dictionary

### Tools
- Calculator, countdown, embed builder, password generator, hex color, poll, random user, URL shortener, time, unixtime, baseconvert

### Community Applications
- Apply forms with custom questions, admin dashboard to approve/deny, auto roles

### Verification
- Verification panel with button, verified role, auto-verify, logs, anti-spam

### Welcome & Goodbye
- Custom welcome/goodbye messages and embeds, welcome channel, auto-role, placeholders `{user} {server} {memberCount}`

### Logging
- Logs for message delete/edit, member join/leave, channel create/delete, role create/delete

### Server Stats
- Live counter channels for members, bots, humans-only — auto updates

### Reaction Roles
- Self-assign roles via reactions / select menus, multi-role support

### Utility
- Avatar, serverinfo, userinfo, weather, first message jump, report to staff, todo list, wipe data

### Join To Create Voice
- Temporary voice channels created when joining a trigger channel, auto-delete when empty

---

## 5. Required Bot Intents and Permissions

### Intents — Turn ON in Discord Developer Portal > Bot

| Intent | Why needed |
|--------|------------|
| **Guilds** | See servers and channels |
| **Guild Members** | Welcome, auto-role, verification, server stats (Privileged — toggle ON) |
| **Guild Messages** | Leveling, counting, economy |
| **Message Content** | Read message text for leveling/tools (Privileged — toggle ON) |
| **Guild Message Reactions** | Reaction roles |
| **Guild Voice States** | Music & join-to-create |
| **Guild Bans** | Ban/unban features |
| **Direct Messages** | DM commands |

### Permissions — Tick when inviting via OAuth2 > URL Generator

| Permission | Why needed |
|------------|------------|
| View Channels | See channels |
| Send Messages | Reply to commands |
| Embed Links | Send embeds |
| Attach Files | Send files/images |
| Read Message History | Purge, logging |
| Manage Messages | Purge, ticket cleanup |
| Manage Channels | Ticket & temp voice creation, counters |
| Manage Roles | Auto-role, level roles, verification |
| Kick Members | Kick / masskick |
| Ban Members | Ban / massban / unban |
| Moderate Members | Timeout / untimeout |
| Connect | Join voice for music |
| Speak | Play music |

> **Tip for beginners:** Tick **Administrator** when inviting to avoid missing permission errors, then reduce later if you want.

