import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (issueId: number) =>
  new ButtonBuilder()
    .setLabel('🔔 DESISTO')
    .setStyle(ButtonStyle.Danger)
    .setCustomId(`issueDrop/${issueId}`);
