import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { Task } from 'src/Util/ParseBody';

export default (issueId: number, task: Task) =>
  new ButtonBuilder()
    .setLabel(`✅ ${task.task}`)
    .setStyle(ButtonStyle.Success)
    .setCustomId(`doneIssue/${issueId}/${task.id}`);
