# EmixFG Discord Bot — Setup Guide

> Made for total beginners. Download the files, paste 2 values, run 3 commands — your bot is online in about 10 minutes.

**In this guide:**
1. [Very Easy Setup Guide (Whole Setup)](#1-very-easy-setup-guide-whole-setup)
2. [All Commands](#2-all-commands)
3. [All Features](#3-all-features)
4. [Required Bot Intents and Permissions](#4-required-bot-intents-and-permissions)
5. [Requirements](#5-requirements)

---

## 1. Very Easy Setup Guide (Whole Setup)

Follow the steps in order. Nothing here is optional except where it says "optional".

### STEP 1 — Install Node.js

1. Go to **https://nodejs.org** and download the **LTS** version (must be **20.10.0 or newer**).
2. Install it with the default options (just keep clicking Next).
3. Open a terminal (on Windows: **PowerShell** or **Command Prompt** / on Mac: **Terminal**) and check it works:

```bash
node -v
```

You should see something like `v20.x.x` or higher.

### STEP 2 — Download the bot files

**Option A — with Git (if you have it):**

```bash
git clone https://github.com/Not4Pranav/Project-003.git
cd Project-003
```

**Option B — without Git:**
1. Open **https://github.com/Not4Pranav/Project-003** in your browser.
2. Click the green **Code** button > **Download ZIP**.
3. Unzip the folder anywhere (for example your Desktop).
4. Open a terminal **inside that folder**:
   - **Windows:** open the unzipped folder, click the address bar in File Explorer, type `cmd`, press Enter.
   - **Mac:** open Terminal, type `cd ` (with a space), drag the folder into the Terminal window, press Enter.

### STEP 3 — Install the bot's packages

In the terminal (inside the bot folder) run:

```bash
npm install
```

Wait until it finishes (1–2 minutes). This creates a `node_modules` folder. You only do this once.

### STEP 4 — Create your Discord bot

1. Go to **https://discord.com/developers/applications** and log in with your Discord account.
2. Click **New Application** (top right), type a name (for example `EmixFG`), click **Create**.
3. In the left menu click **Bot** > click **Reset Token** > **Yes, do it!** > click **Copy**.
   - This long text is your **bot token**. Keep it secret — anyone with it can control your bot.
4. In the left menu click **General Information** > copy the **Application ID**.

You now have the **2 values** the bot needs:
| Value | Where you got it |
|-------|------------------|
| `DISCORD_TOKEN` | Bot page > Reset Token > Copy |
| `CLIENT_ID` | General Information > Application ID |

### STEP 5 — Turn ON the required intents

Still in the Developer Portal, on the **Bot** page:

1. Scroll down to **Privileged Gateway Intents**.
2. Turn **ON** both switches:
   - ✅ **Server Members Intent**
   - ✅ **Message Content Intent**
3. Click **Save Changes**.

> Without these, welcome messages, leveling, reaction roles and moderation will not work. (Full intent list is in [section 4](#4-required-bot-intents-and-permissions).)

### STEP 6 — Fill in your .env file

In the bot folder, run:

```bash
# Mac / Linux:
cp .env.example .env

# Windows (Command Prompt):
copy .env.example .env
```

Now open the new **`.env`** file with any text editor (Notepad works fine). You only **must** fill in the first two lines:

```env
DISCORD_TOKEN=paste_your_bot_token_here
CLIENT_ID=paste_your_application_id_here
```

**Optional (recommended):** these make setup faster and unlock owner features.

```env
GUILD_ID=your_server_id
OWNER_IDS=your_discord_user_id
PREFIX=!
```

How to get those IDs:
1. In Discord go to **Settings > Advanced** and turn ON **Developer Mode**.
2. Right-click your **server icon** > **Copy Server ID** → paste as `GUILD_ID`.
3. Right-click your **profile** > **Copy User ID** → paste as `OWNER_IDS`.
4. Leave `PREFIX=!` as it is (this is the prefix for text commands like `!balance`).

Save the file. **This `.env` file is the only file you ever have to edit.**

### STEP 7 — Invite the bot to your server

1. In the Developer Portal, go to **OAuth2 > URL Generator** in the left menu.
2. Under **Scopes** tick: **`bot`** and **`applications.commands`**.
3. Under **Bot Permissions** tick the permissions from this list (or simply tick **Administrator** while testing):
   - View Channels, Send Messages, Embed Links, Attach Files, Read Message History, Manage Messages, Manage Channels, Manage Roles, Kick Members, Ban Members, Moderate Members, Connect, Speak
4. Scroll down, copy the **Generated URL**, open it in your browser.
5. Pick your server, click **Continue > Authorize**, finish the captcha.

The bot now appears in your server (offline until you start it).

### STEP 8 — Deploy the slash commands

In the terminal, inside the bot folder, run **one** of these:

```bash
# Instant (recommended): commands appear in YOUR server right away.
# Needs GUILD_ID filled in .env (Step 6).
npm run deploy:guild

# OR Global: works in every server, but can take up to 1 hour to appear.
npm run deploy:global
```

Success looks like: `[Deploy] ✅ Deployed 99 commands to your server (instant)`

> Run this again whenever you update the bot files.

### STEP 9 — Start the bot 🎉

```bash
npm start
```

Success looks like this:

```
[EmixFG] 🚀 Starting bot...
[EmixFG] ✅ Loaded 99 commands
[EmixFG] ✅ Loaded 14 events
[EmixFG] ✅ Loaded 50 buttons, 4 menus, 10 forms
[EmixFG] ✅ Music system ready
[EmixFG] 🎉 Bot is ONLINE! Go to Discord and try /ping
```

Go to your Discord server and type **`/ping`**. If the bot answers — **you are done!**

- **Keep it online:** leave the terminal window open. Closing it stops the bot. Press **Ctrl + C** to stop it manually.
- **Start it again later:** open a terminal in the bot folder and run `npm start`.
- **24/7 hosting:** the bot must run on an always-on machine (a VPS, Railway, etc.). The bot includes a small health page on port `3000` (`/health`) that hosting platforms can use.
- **Data note:** without a PostgreSQL database the bot uses memory storage, so economy/level data resets when the bot restarts. Everything else works the same.

### Something went wrong?

| Error message | How to fix |
|---------------|------------|
| `❌ DISCORD_TOKEN is missing!` | Open `.env` and paste your bot token (Step 4 > Bot page > Reset Token). |
| `❌ CLIENT_ID is missing!` | Open `.env` and paste your Application ID (Step 4 > General Information). |
| `Your DISCORD_TOKEN is wrong` | You copied the token incorrectly. Reset it again on the Bot page and paste the new one. |
| `Privileged intents are not turned ON` | Do Step 5 again and click **Save Changes**. |
| `GUILD_ID is empty in .env` | Either fill `GUILD_ID` in `.env`, or use `npm run deploy:global` instead. |
| Commands don't show up in Discord | Re-run `npm run deploy:guild`. Make sure you invited the bot with the `applications.commands` scope (Step 7). Global deploy can take up to 1 hour. |
| Bot is online but can't kick/ban | You invited it without those permissions. Re-do Step 7 and tick the missing permissions. |
| `'node' is not recognized` | Node.js is not installed (or the terminal was open during install). Install from nodejs.org, then open a NEW terminal. |
| `Cannot find module` error | You skipped Step 3. Run `npm install` inside the bot folder. |

---

## 2. All Commands

All commands are **slash commands** — type `/` in Discord and pick one. `()` below means required, `[]` means optional.

Most commands also work with the text prefix `!` (for example `!balance`, `!bal`, `!pay @user 100`). Dashboards and setup flows are slash-only. Music has prefix shortcuts too: `!pause`, `!resume`, `!skip`, `!stop`, `!leave`, `!volume`.

### Core
| Command | What it does |
|---------|--------------|
| `/ping` | Check the bot's latency and API speed |
| `/help` | Interactive help menu with all commands |
| `/stats` | Bot statistics (servers, users, versions) |
| `/uptime` | How long the bot has been online |
| `/support` | Get the support server link |
| `/configwizard` | Server configuration dashboard and setup wizard |
| `/commands dashboard` | Interactive command access dashboard |
| `/commands disable (scope) (target)` | Disable a command or a whole category |
| `/commands enable (scope) (target)` | Re-enable a command or category |

### Moderation
| Command | What it does |
|---------|--------------|
| `/warn (target) (reason)` | Warn a user |
| `/warnings (target)` | View all warnings of a user |
| `/cases [filter] [user] [limit]` | View moderation cases and audit logs |
| `/kick (target) [reason]` | Kick a user |
| `/ban (target) [reason]` | Ban a user |
| `/unban (target) [reason]` | Unban a user |
| `/massban (users) [reason] [delete_days]` | Ban many users at once |
| `/masskick (users) [reason]` | Kick many users at once |
| `/timeout (target) (duration) [reason]` | Timeout (mute) a user |
| `/untimeout (target)` | Remove a timeout |
| `/purge (amount)` | Bulk-delete messages |
| `/lock` | Lock the current channel |
| `/unlock` | Unlock the current channel |
| `/say (message) [channel]` | Send a message as the bot |
| `/dm (user) (message) [anonymous]` | Send a DM to a user (staff only) |
| `/usernotes add (target) (note) [type]` | Add a staff note to a user |
| `/usernotes view (target)` | View notes for a user |
| `/usernotes remove (target) (index)` | Remove one note |
| `/usernotes clear (target)` | Clear all notes of a user |

### Economy
| Command | What it does |
|---------|--------------|
| `/balance [user]` | Check wallet + bank balance |
| `/daily` | Claim your daily reward |
| `/work` | Work to earn money |
| `/beg` | Beg for a small amount |
| `/crime (type)` | Commit a crime (risky, big payout) |
| `/slut` | Risky provocative job (random payout/loss) |
| `/rob (user)` | Rob another user (very risky) |
| `/fish` | Go fishing to earn money |
| `/mine` | Go mining to earn money |
| `/gamble (amount)` | Gamble for a chance to win more |
| `/pay (user) (amount)` | Send money to someone |
| `/deposit (amount)` | Move money to your bank |
| `/withdraw (amount)` | Take money out of your bank |
| `/shop` | Browse the shop |
| `/buy (item_id) [quantity]` | Buy a shop item |
| `/shop-config setrole (role)` | Set the role granted by the Premium Role shop item |
| `/inventory` | View your items |
| `/eleaderboard` | Top 10 richest users |
| `/economy dashboard` | Economy management dashboard |

### Leveling
| Command | What it does |
|---------|--------------|
| `/level setup (channel) [xp_min] [xp_max] [message] [xp_cooldown]` | Set up and enable leveling |
| `/level dashboard` | Interactive leveling configuration |
| `/rank [user]` | Rank card with level and XP |
| `/leaderboard` | Server level leaderboard |
| `/leveladd (user) (levels)` | Add levels to a user |
| `/levelremove (user) (levels)` | Remove levels from a user |
| `/levelset (user) (level)` | Set a user's level |

### Fun
| Command | What it does |
|---------|--------------|
| `/count setup (channel) (system)` | Start the counting game in a channel |
| `/count status` | Current counting game status |
| `/count reset [start]` | Reset the counting sequence |
| `/count leaderboard` | Counting leaderboard |
| `/count disable` | Disable the counting game |
| `/fight (opponent)` | Simulated 1v1 text battle |
| `/flip` | Flip a coin (heads or tails) |
| `/roll (notation)` | Roll dice, e.g. `2d20` or `1d6+5` |

### Giveaway
| Command | What it does |
|---------|--------------|
| `/gcreate (duration) (winners) (prize) [channel]` | Create a giveaway (duration like `30m`, `1h`, `1d`) |
| `/gend (messageid)` | End a giveaway now and pick winners |
| `/greroll (messageid)` | Reroll the winners |
| `/gdelete (messageid)` | Delete a giveaway |

### Music
| Command | What it does |
|---------|--------------|
| `/play (query)` | Play a song (name or link) or queue it |
| `/join` | Join your voice channel |
| `/nowplaying` | Show the current track (with control buttons) |
| `/queue [page]` | Show the queue |
| `/music pause` / `/music resume` | Pause / resume playback |
| `/music skip` / `/music stop` | Skip track / stop and clear queue |
| `/music shuffle` | Shuffle the queue |
| `/music loop (mode)` | Set loop mode |
| `/music volume (level)` | Set the volume |
| `/music seek (seconds)` | Jump to a position in the track |
| `/music remove (position)` | Remove a track from the queue |
| `/music move (from) (to)` | Move a track in the queue |
| `/music clear` | Clear the queue |
| `/music leave` | Disconnect the bot |
| `/music 247 (enabled)` | Toggle 24/7 mode (stay in voice when idle) |

### Ticket
| Command | What it does |
|---------|--------------|
| `/ticket setup (panel_channel) (panel_message) [button_label] [category] [closed_category] [staff_role] [max_tickets_per_user] [dm_on_close]` | Create the ticket panel |
| `/ticket dashboard` | Interactive ticket dashboard |
| `/claim` | Claim the ticket (staff) |
| `/close [reason]` | Close the ticket |
| `/priority (level)` | Set ticket priority |

### Verification
| Command | What it does |
|---------|--------------|
| `/verification setup (verification_channel) (verified_role) [message] [button_text]` | Set up verification panel |
| `/verification remove (user)` | Remove verification from a user |
| `/verification dashboard` | Verification configuration dashboard |
| `/verify` | Verify yourself (button panel) |
| `/autoverify setup (role) (criteria) [account_age_days]` | Set up automatic verification |
| `/autoverify dashboard` | Auto-verification dashboard |

### Welcome / Goodbye / Auto-role
| Command | What it does |
|---------|--------------|
| `/welcome setup (channel) (message) [image] [ping]` | Set up the welcome message |
| `/goodbye setup (channel) (message) [image] [ping]` | Set up the goodbye message |
| `/greet dashboard` | Welcome & goodbye dashboard |
| `/autorole add (role)` | Auto-assign a role to new members |
| `/autorole remove (role)` | Stop auto-assigning a role |
| `/autorole list` | List auto-assigned roles |

Welcome/goodbye messages support placeholders: `{user}`, `{server}`, `{memberCount}`.

### Reaction Roles
| Command | What it does |
|---------|--------------|
| `/reactroles setup (channel) (title) (description) (role1) [role2] [role3] [role4] [role5]` | Create a reaction-role panel (up to 5 roles) |
| `/reactroles dashboard [panel]` | Manage existing panels |

### Logging
| Command | What it does |
|---------|--------------|
| `/logging dashboard` | Set channels, filters, toggle log categories |
| `/logging channel (destination) [channel] [disable]` | Quick-set a log channel |

### Server Stats
| Command | What it does |
|---------|--------------|
| `/serverstats create (type) (channel_type) (category)` | Create a live counter channel (members / bots / humans) |
| `/serverstats list` | List all counters |
| `/serverstats update (counter-id) [type]` | Update a counter |
| `/serverstats delete (counter-id)` | Delete a counter |

### Join To Create (temporary voice channels)
| Command | What it does |
|---------|--------------|
| `/jointocreate setup [category] [channel_name] [user_limit] [bitrate]` | Create a Join-to-Create trigger channel |
| `/jointocreate dashboard (trigger_channel)` | Configure an existing system |

### Community Applications
| Command | What it does |
|---------|--------------|
| `/apply submit (application)` | Submit an application for a role |
| `/apply status [id]` | Check your application status |
| `/apply list` | List open applications |
| `/app-admin setup` | Set up a new application |
| `/app-admin review (id)` | Approve or deny an application |
| `/app-admin list [status] [role] [user] [limit]` | List applications |
| `/app-admin dashboard [application]` | Applications dashboard |

### Birthday
| Command | What it does |
|---------|--------------|
| `/birthday set (month) (day)` | Set your birthday |
| `/birthday info [user]` | View birthday information |
| `/birthday list` | List all birthdays in the server |
| `/birthday next` | Upcoming birthdays |
| `/birthday remove` | Remove your birthday |
| `/birthday setchannel [channel]` | Set (or disable) the announcement channel |

### Search
| Command | What it does |
|---------|--------------|
| `/search google (query)` | Search Google |
| `/search define (word)` | Look up a word definition |
| `/search urban (term)` | Search Urban Dictionary |

### Tools
| Command | What it does |
|---------|--------------|
| `/calculate (expression)` | Calculator |
| `/countdown [minutes] [seconds] [title]` | Countdown timer with buttons |
| `/embedbuilder` | Build a custom embed with live preview |
| `/generatepassword [length] [uppercase] [numbers] [symbols]` | Generate a strong password |
| `/hexcolor [color]` | Hex color info with preview (random if empty) |
| `/poll (question) (option1) (option2) [option3..10] [anonymous]` | Poll with up to 10 options |
| `/randomuser [role] [bots] [online] [mention]` | Pick a random server member |
| `/shorten (url) [custom]` | Shorten a URL |
| `/time [timezone]` | Current time in timezones |
| `/unixtime` | Current Unix timestamp |
| `/baseconvert (number) (from) [to]` | Convert numbers between bases |

### Utility
| Command | What it does |
|---------|--------------|
| `/avatar [target]` | Show a user's avatar |
| `/userinfo [target]` | Detailed user info |
| `/serverinfo` | Detailed server info |
| `/weather (city)` | Real-time weather for a location |
| `/firstmsg` | Link to the first message of the channel |
| `/report file (user) (reason)` | Report a user to the staff |
| `/report setchannel (channel)` | Set where reports go |
| `/todo add (task)` | Add a task to your to-do list |
| `/todo list` | View your to-do list |
| `/todo complete (number)` | Mark a task complete |
| `/todo remove (number)` | Remove a task |
| `/todo share [create] [add] [view] [addtask] [remove]` | Shared to-do lists |
| `/wipedata` | Delete all your personal data from the bot |

---

## 3. All Features

- **Moderation suite** — warn, kick, ban, unban, timeout, untimeout (with reasons), mass ban/kick, message purge, channel lock/unlock, say/DM as the bot, staff notes per user, full moderation case history.
- **Economy system** — wallet + bank with deposit/withdraw, daily reward, work, beg, crime, slut, rob, fish, mine, gamble, user-to-user payments, shop with buyable items and inventory, a shop item that grants a Discord role, richest-users leaderboard, and an economy dashboard for admins.
- **Leveling & XP** — XP on every message with configurable min/max XP and cooldown, custom level-up message and channel, level-up role rewards with automatic sync, rank card, leaderboard, and admin tools to add/remove/set levels — all configured from `/level setup` or the dashboard.
- **Ticket system** — button panel in any channel, open/closed categories, staff role, per-user ticket limits, claim tickets, 5 priority levels with colors, close with reason, transcripts, close-DMs, user feedback form, and a management dashboard.
- **Giveaways** — create with duration, winners and prize, join button, automatic winner picking when time is up, end early, reroll, delete, and participant view.
- **Birthday system** — members set birthdays, automatic daily announcements in a chosen channel, list and upcoming birthdays.
- **Music player** — play songs by name or link (YouTube, Spotify, SoundCloud and more via public Lavalink v4 nodes), queue with pages, interactive buttons (pause/resume/skip/stop/shuffle/loop/volume/queue), seek, move/remove/clear tracks, 24/7 mode, and text-prefix shortcuts.
- **Verification** — verify button panel with custom message/button text, verified role, staff can unverify users, and optional auto-verification by account age — with anti-spam cooldowns and attempt limits.
- **Welcome, goodbye & auto-role** — custom welcome/goodbye messages with `{user}` `{server}` `{memberCount}` placeholders, optional images and user ping, and roles automatically given to new members.
- **Reaction roles** — panels with up to 5 self-assignable roles, reactions handled automatically, panel management dashboard.
- **Server logging** — per-category toggles, channels and filters from one dashboard; logs deleted/edited messages, member joins/leaves/updates, channel deletions, role creations/deletions and profile changes.
- **Server stats counters** — live counter channels for members, bots and humans-only; they update automatically every 15 minutes and clean themselves up if deleted.
- **Join-to-Create voice** — users join a trigger channel and get their own temporary voice channel with custom name/limit/bitrate options; channels auto-delete when empty.
- **Community applications** — custom application forms with questions, modal-based apply flow, staff review with approve/deny, filters and lists, and an admin dashboard.
- **Search** — Google, dictionary definitions, and Urban Dictionary right in chat.
- **Tools** — calculator, countdown timer, embed builder with live preview, password generator, hex color preview, polls with up to 10 options, random member picker, URL shortener, timezone time, Unix timestamp, and number-base converter.
- **Utility** — avatar, user info, server info, weather, jump-to-first-message, user reports to staff, personal and shared to-do lists, and one-command personal data wipe.
- **Fun** — counting game with leaderboard, 1v1 text battles, coin flip, and dice rolling.
- **Server management** — per-server settings, per-server command disable/enable, feature toggles, setup wizard, and an interactive help menu.
- **Reliability** — works with PostgreSQL, and falls back to built-in memory storage if no database is installed; friendly startup errors; a `/health` web endpoint for hosting platforms; every server's data is isolated.

---

## 4. Required Bot Intents and Permissions

### Intents (turn ON in Developer Portal > Your App > Bot)

| Intent | Privileged? | Why the bot needs it |
|--------|-------------|----------------------|
| **Guilds** | No | See servers and channels (basic operation) |
| **Guild Members** | ✅ **Yes — toggle ON** | Welcome/goodbye, auto-role, verification, server stats |
| **Guild Messages** | No | Commands, leveling XP, counting game |
| **Message Content** | ✅ **Yes — toggle ON** | Read message text for prefix commands, leveling, counting |
| **Guild Message Reactions** | No | Reaction roles |
| **Guild Voice States** | No | Music and Join-to-Create voice channels |
| **Guild Bans** | No | Ban/unban features |
| **Direct Messages** | No | Ticket DMs and DM features |

Only the two **Privileged Gateway Intents** need to be switched on manually (Setup Step 5): **Server Members Intent** and **Message Content Intent**. The rest work automatically.

### Permissions (tick when creating the invite URL in Step 7)

| Permission | Why the bot needs it |
|------------|----------------------|
| View Channels | See channels |
| Send Messages | Reply to commands |
| Embed Links | Send embeds (help, dashboards, music, tickets…) |
| Attach Files | Send images and transcripts |
| Read Message History | Purge, logging, tickets |
| Manage Messages | Purge and message cleanup |
| Manage Channels | Create tickets, temp voice channels, counter channels |
| Manage Roles | Auto-role, level roles, verification role, shop role reward |
| Kick Members | `/kick`, `/masskick` |
| Ban Members | `/ban`, `/massban`, `/unban` |
| Moderate Members | `/timeout`, `/untimeout` |
| Connect | Join voice channels (music, Join-to-Create) |
| Speak | Play music |

> **Beginner tip:** tick **Administrator** in the invite URL to skip all permission problems, then invite the bot again with fewer permissions later if you want.

---

## 5. Requirements

| Requirement | Details |
|-------------|---------|
| **Node.js 20.10.0 or newer** | Download (free) from https://nodejs.org — pick the LTS version. Check with `node -v`. |
| **A Discord account** | Needed to create the bot at https://discord.com/developers/applications |
| **A Discord server where you are admin** | The bot can only be invited to servers where you have the "Manage Server" or "Administrator" permission. |
| **A computer that can stay on** | The bot runs while your terminal is open. For 24/7 uptime use a VPS or a hosting service such as Railway. |
| **Internet connection** | The bot needs internet to reach Discord (and public Lavalink nodes for music). |

**Optional (not required):**
- **Git** — only used for the `git clone` download option. Without it, use **Code > Download ZIP** on GitHub.
- **PostgreSQL** — gives permanent data storage. Without it, the bot automatically uses memory storage (data resets on restart) and everything else still works.

That's all — no coding knowledge needed. Enjoy your bot! 🎉
