import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (issueId: number, devId: number) =>
  new ButtonBuilder()
    .setLabel('EU DESISTO SENHOR')
    .setStyle(ButtonStyle.Danger)
    .setCustomId(`issueDrop/${issueId}/${devId}`);
