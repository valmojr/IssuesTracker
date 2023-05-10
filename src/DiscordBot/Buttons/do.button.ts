import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (issueId: number, taskId: number) =>
  new ButtonBuilder()
    .setLabel('✅ concluir')
    .setStyle(ButtonStyle.Success)
    .setCustomId(`doneIssue/${issueId}/${taskId}`);
