import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show bot help and commands'),
  
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor('#336699')
      .setTitle('EmixFG Bot Help')
      .setDescription('Complete Discord bot with moderation, economy, music, and more!')
      .addFields(
        { name: '📋 Core', value: '`/ping`, `/help`, `/stats`' },
        { name: '🛡️ Moderation', value: '`/warn`, `/kick`, `/ban`, `/mute`, `/purge`' },
        { name: '💰 Economy', value: '`/balance`, `/daily`, `/work`, `/pay`, `/shop`' },
        { name: '🎵 Music', value: '`/play`, `/pause`, `/resume`, `/skip`, `/stop`' },
        { name: '🎫 Tickets', value: '`/ticket`, `/close`, `/claim`' },
        { name: '📊 Leveling', value: '`/rank`, `/leaderboard`, `/xp`' },
        { name: '🎁 Giveaways', value: '`/giveaway`, `/greroll`' },
        { name: '🎂 Birthday', value: '`/setbirthday`, `/birthdays`' },
      )
      .setFooter({ text: 'EmixFG - Ultimate Discord Bot' })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
