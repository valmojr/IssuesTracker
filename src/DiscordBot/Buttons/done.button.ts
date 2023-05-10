import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (issueId: number, taskId: number) =>
  new ButtonBuilder()
    .setLabel('⚠️ desfazer')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(false)
    .setCustomId(`doneIssue/${issueId}/${taskId}`);
