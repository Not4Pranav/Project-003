# EmixFG Discord Bot - Easy Setup Guide

## Requirements
- Node.js 20.10.0 or higher
- Discord Bot Application

---

## Setup (5 Minutes)

### 1. Download Bot
```bash
git clone https://github.com/Not4Pranav/Project-003.git
cd Project-003
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Bot
```bash
cp .env.example .env
nano .env
```

**Edit .env file:**
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

### 4. Create Discord Bot
1. Go to: https://discord.com/developers/applications
2. New Application > Name it "EmixFG"
3. Go to Bot tab > Add Bot
4. Copy **Bot Token** (DISCORD_TOKEN)
5. Copy **Client ID** (CLIENT_ID)

### 5. Enable Intents
In Bot tab, enable:
- Server Members Intent
- Message Content Intent

### 6. Invite Bot to Server
1. Go to OAuth2 > URL Generator
2. Select scopes: `bot`, `applications.commands`
3. Select permissions (see below)
4. Copy URL, open in browser, authorize

### 7. Deploy Commands
```bash
npm run deploy:guild
```

### 8. Start Bot
```bash
npm start
```

---

## Required Bot Intents
- Guilds
- Guild Members
- Guild Messages
- Message Content
- Guild Message Reactions
- Guild Voice States
- Guild Bans
- Direct Messages

---

## Required Bot Permissions
- View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Manage Messages
- Manage Channels
- Manage Roles
- Kick Members
- Ban Members
- Moderate Members
- Connect
- Speak

---

## All Commands

### Core
- `/ping` - Check bot latency
- `/help` - Show help
- `/stats` - Bot statistics
- `/support` - Support server link

### Moderation
- `/warn @user [reason]` - Warn a user
- `/kick @user [reason]` - Kick a user
- `/ban @user [reason]` - Ban a user
- `/unban user_id` - Unban a user
- `/mute @user [time] [reason]` - Mute a user
- `/unmute @user` - Unmute a user
- `/purge 10` - Delete 10 messages
- `/lock #channel` - Lock a channel
- `/unlock #channel` - Unlock a channel
- `/lockdown` - Lockdown server
- `/unlockdown` - End lockdown
- `/dm @user message` - Send DM
- `/say #channel message` - Send message as bot
- `/massban @user1 @user2` - Ban multiple users
- `/masskick @user1 @user2` - Kick multiple users
- `/timeout @user 10m reason` - Timeout user
- `/untimeout @user` - Remove timeout
- `/usernotes add @user note` - Add user note
- `/usernotes view @user` - View user notes
- `/usernotes remove @user` - Remove user note
- `/cases` - View moderation cases
- `/warnings @user` - View user warnings

### Economy
- `/balance` - Check balance
- `/daily` - Claim daily reward (100 coins)
- `/work` - Work to earn coins (10-100)
- `/beg` - Beg for coins (5-50)
- `/crime` - Commit crime for coins
- `/rob @user` - Rob another user
- `/pay @user 100` - Send coins
- `/shop` - View shop items
- `/buy item_name` - Buy item
- `/inventory` - View inventory
- `/leaderboard` - Economy leaderboard
- `/deposit 100` - Deposit to bank
- `/withdraw 100` - Withdraw from bank
- `/fish` - Go fishing
- `/mine` - Mine for coins
- `/gamble 100` - Gamble coins

### Fun
- `/8ball question` - Magic 8-ball
- `/coinflip` - Flip a coin
- `/dice` - Roll dice
- `/fact` - Random fact
- `/reverse text` - Reverse text
- `/wanted @user` - Create wanted poster
- `/count 10` - Count to 10
- `/fight @user` - Fight user
- `/flip text` - Flip text upside down
- `/roll 2d20` - Roll custom dice

### Ticket
- `/ticket` - Create ticket
- `/close` - Close ticket
- `/claim` - Claim ticket
- `/priority low|medium|high|urgent` - Set priority
- `/transcript` - Get ticket transcript

### Leveling
- `/rank` - Check rank
- `/leaderboard` - XP leaderboard
- `/xp` - Check XP
- `/level` - Check level
- `/leveladd @user 100` - Add XP
- `/levelremove @user 100` - Remove XP
- `/levelset @user 5` - Set level

### Giveaway
- `/giveaway 24h 1w Prize!` - Start giveaway
- `/gcreate 24h 1w Prize!` - Create giveaway
- `/gend message_id` - End giveaway
- `/gdelete message_id` - Delete giveaway
- `/greroll message_id` - Reroll winners

### Birthday
- `/setbirthday MM-DD` - Set birthday
- `/birthday` - Check birthday
- `/birthdays` - List birthdays
- `/birthday_info` - Birthday info
- `/birthday_list` - All birthdays
- `/birthday_remove @user` - Remove birthday
- `/birthday_setchannel #channel` - Set birthday channel

### Music
- `/play song` - Play song
- `/join` - Join voice channel
- `/leave` - Leave voice channel
- `/pause` - Pause
- `/resume` - Resume
- `/skip` - Skip song
- `/stop` - Stop
- `/volume 50` - Set volume
- `/queue` - View queue
- `/nowplaying` - Current song
- `/loop` - Toggle loop
- `/shuffle` - Shuffle queue
- `/seek 30` - Seek in song

**Quick Music (in voice chat):**
- `join`, `leave`, `np`, `pause`, `resume`, `skip`, `stop`, `volume 50`, `loop`, `shuffle`

### Search
- `/search query` - Search
- `/search google query` - Google search
- `/search define word` - Define word
- `/search urban word` - Urban dictionary

### Tools
- `/calculate 2+2` - Calculate
- `/countdown 10s` - Countdown
- `/embedbuilder` - Build embed
- `/generatepassword` - Generate password
- `/hexcolor` - Hex color info
- `/poll "Question?"` - Create poll
- `/randomuser` - Random user
- `/shorten url` - Shorten URL
- `/time` - Current time
- `/unixtime` - Unix timestamp
- `/baseconvert 10 2` - Convert number base

### Community
- `/apply` - Submit application
- `/app-admin` - Manage applications

### Verification
- `/verify` - Create verification panel
- `/verification` - Verification settings
- `/autoverify` - Auto-verify settings

### Welcome
- `/welcome` - Welcome settings
- `/greet message` - Set welcome message
- `/goodbye message` - Set goodbye message
- `/autorole @role` - Set auto-role

### Logging
- `/logging` - Logging settings

### Server Stats
- `/serverstats` - Server stats settings
- `/counter members` - Create member counter

**Counter Types:** members, bots, members_only

### Reaction Roles
- `/reactroles` - Reaction roles settings

---

## All Features

### Moderation
- Mass ban/kick
- User notes system
- Case management
- Warnings with tracking
- Temporary mutes/timeouts
- Channel locking
- Server lockdown

### Economy
- Coin system with balance
- Daily rewards
- Work, beg, crime, rob commands
- Shop with items
- Inventory system
- Bank system (deposit/withdraw)
- Leaderboards
- Fishing and mining
- Gambling

### Fun
- 8Ball predictions
- Coin flipping
- Dice rolling
- Random facts
- Text manipulation (reverse, flip)
- Wanted posters
- Counting game
- Fighting system

### Ticket System
- Ticket creation
- Claim system for staff
- Priority levels (none, low, medium, high, urgent)
- Transcript system
- Archive system
- Auto-close inactive tickets

### Leveling
- XP on messages
- Level up system
- Rank cards
- XP leaderboards
- Level roles (auto-assign roles at certain levels)
- Manual XP adjustment

### Giveaways
- Multiple winners
- Auto winner selection
- Reroll system
- End giveaway early
- Delete giveaways

### Birthday
- Birthday tracking
- Auto announcements
- Timezone support
- Birthday role assignment
- Birthday list

### Music
- Play from YouTube, Spotify, SoundCloud, etc.
- Queue system
- Volume control
- Loop and shuffle
- Now playing info
- 24/7 mode
- Button controls
- Prefix commands in voice chat

### Search
- Google search
- Word definitions
- Urban dictionary
- Multi-platform search

### Tools
- Calculator
- Countdown timer
- Embed builder
- Password generator
- Hex color info
- Poll system
- Random user selector
- URL shortener
- Time commands
- Base conversion

### Community
- Application forms
- Application management
- Application dashboard

### Verification
- Verification panel
- Auto-verify options
- Verification roles
- Verification logs
- Anti-spam protection

### Welcome
- Custom welcome messages
- Auto-role assignment
- Goodbye messages
- Welcome channel configuration
- Placeholders: {user}, {server}, {memberCount}

### Logging
- Message delete logging
- Message edit logging
- Member join/leave logging
- Channel create/delete logging
- Role create/delete logging

### Server Stats
- Member counter channels
- Bot counter channels
- Human counter channels
- Real-time updates
- Custom counter types

### Reaction Roles
- Self-assignable roles
- Emoji-based selection
- Multi-role support
- Custom messages
- Role management

---

## Done!

Your bot is now ready. Just run `npm start` and use the commands in your Discord server.
