import { DMChannel, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import ParseBody from 'src/Util/ParseBody';
import ParseLabel, { translateLabelToMessage } from 'src/Util/ParseLabel';
import { Issue, User } from 'src/Util/entities';
import doButton from '../Buttons/do.button';
import doneButton from '../Buttons/done.button';
import dropButton from '../Buttons/drop.button';
import MonthTranslator from 'src/Util/MonthTranslator';

export default async (dev: User, channel: DMChannel, issues: Issue[]) => {
  issues.forEach(async (issue) => {
    const assignees: string =
      issue.assignees?.length > 1
        ? `Responsáveis: Você, ${issue.assignees
            .filter((otherDevs) => otherDevs.id != dev.id)
            .join(', ')}\n\n`
        : 'Responsável: Você';

    const tasks = ParseBody.tasksGenerator(issue.body);

    const labels = ParseLabel(issue);

    const due_on = new Date(issue?.milestone?.due_on);

    const dueDate = issue?.milestone
      ? `Prazo: ${due_on.getDay()}/${MonthTranslator(due_on.getMonth())}\n`
      : '';

    await channel.send({
      content:
        `**${issue.title.toUpperCase()}**\n\n` +
        `${assignees}\n` +
        dueDate +
        translateLabelToMessage(labels),
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          dropButton(issue.id),
        ),
      ],
    });

    tasks.forEach(async (task) => {
      await channel.send({
        content: `• ${task.task}`,
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            task.isDone
              ? doneButton(issue.id, task.id)
              : doButton(issue.id, task.id),
          ),
        ],
      });
    });
  });
};
